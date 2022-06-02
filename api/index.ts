import fsPromise from 'fs/promises';
import path from 'path';
import Result from '../utils/interface';

module.exports = async (req: any, res: any) => {
  try {
    let result;
    const month = req.query.month;
    const year = req.query.year ? req.query.year : new Date().getFullYear();
    const json = await fsPromise.readFile(
      path.join(__dirname, '..', 'data', `${year}.json`),
      'utf8'
    );

    const parseResult = JSON.parse(json);
    if (month && year) {
      result = parseResult.filter((item: Result) => {
        if (new Date(item.date).getMonth() + 1 == month) {
          return item;
        }
      });
    } else if (year) {
      result = json;
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(200).send([]);
  }
};
