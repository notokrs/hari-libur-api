import axios from 'axios';
import {JSDOM} from 'jsdom';
import fs from 'fs';
import path from 'path';
import Result from '../utils/interface';
import {Month} from '../utils/enum';

/**
 * Fungsi untuk mendapatkan HTML kalender dari tanggalan.com
 * @param {string} month : bulan yang ingin didapatkan
 * @param {int} year : tahun yang ingin didapatkan
 * @return {Promise} : hasil kalender
 */
function getCalendar(
  month: number | string,
  year: number | string
): Promise<string> {
  return axios
    .get(`https://tanggalan.com/${month}-${year}`)
    .then((response) => response.data)
    .catch((error) => error);
}

/**
 * Fungsi untuk mendapatkan hari libur
 * @param {int} year : tahun yang ingin didapatkan
 */
async function getHariLibur(year: string | number) {
  const result: Array<Result> = [];
  for (let i = 1; i <= 12; i++) {
    try {
      await getCalendar(Month[i], year).then((data: string) => {
        const {document} = new JSDOM(data).window;
        const events = document.getElementById('events');
        const hariPenting = events?.querySelectorAll('div.event');

        Array.from(hariPenting!).forEach((day) => {
          const datePatternRange = /^[0-9]+\s-\s[0-9]+/g;
          const datePattern = /^[0-9]+/g;

          if (datePatternRange.test(day.children[1].textContent!)) {
            const dayRangeFilter = day.children[1]
              .textContent!.match(datePatternRange)
              ?.toString();
            const dayRangeArray = dayRangeFilter?.split(' ')!;
            const dateRange: Array<string> = [];

            for (
              let j = parseInt(dayRangeArray[0]);
              j <= parseInt(dayRangeArray[2]);
              j++
            ) {
              const date = dateFormatter(`${year}-${i}-${j}`);
              dateRange.push(date);
            }

            dateRange.forEach((date) => {
              const mResult = {
                event_date: date,
                event_name: day.children[0].textContent!,
                is_national_holiday:
                  day.children[0].classList.contains('libur'),
              };

              result.push(mResult);
            });
          } else if (datePattern.test(day.children[1].textContent!)) {
            const dayFilter = day.children[1].textContent!.match(datePattern)!;
            const date = dateFormatter(`${year}-${i}-${dayFilter[0]}`);
            const mResult = {
              event_date: date,
              event_name: day.children[0].textContent!,
              is_national_holiday: day.children[0].classList.contains('libur'),
            };

            result.push(mResult);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  }
  const sortedResult = result
    .slice()
    .sort(
      (a, b) =>
        new Date(a.event_date).valueOf() - new Date(b.event_date).valueOf()
    );

  const resultFile = path.join(__dirname, '..', 'data', `${year}.json`);
  fs.writeFile(resultFile, JSON.stringify(sortedResult), (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Berhasil menyimpan data dari tahun ${year}`);
    }
  });
}

/**
 * Fungsi untuk memformat tanggal menjadi yyyy-mm-dd
 * @param {string} date : tanggal yang akan di format
 * @return {string} : tanggal yang sudah diformat
 */
function dateFormatter(date: string) {
  const d = new Date(date);
  const year = d.getFullYear();
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

const year = new Date().getFullYear();
getHariLibur(year);
