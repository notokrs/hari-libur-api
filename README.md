# Hari Libur & Hari Penting Lainnya API

API ini berguna untuk menampilkan Hari Libur & Hari Penting dalam kalender Indonesia.

## Respon API

```json
{
  "date": "2022-05-02", // yyyy-mm-dd
  "event": "Hari Raya Idul Fitri 1443 H",
  "is_national_holiday": true
}
```

## Endpoint

| Endpoint                                                                          | Fungsi                                                                   |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [/api](https://hari-libur-api.vercel.app/api)                                     | Menampilkan keseluruhan hari libur & hari penting ditahun sekarang       |
| [/api?year=2022](https://hari-libur-api.vercel.app/api?year=2022)                 | Menampilkan keseluruhan hari libur & hari penting ditahun 2022           |
| [/api?month=5?year=2022](https://hari-libur-api.vercel.app/api?month=5&year=2022) | Menampilkan keseluruhan hari libur & hari penting dibulan Mei tahun 2022 |

> Request endpoint selain daftar diatas dan tahun yang tidak ada dalam database akan menghasilkan array kosong / [ ].

## Self-Hosting (Express)

Jika Anda ingin menjalankan API ini secara mandiri menggunakan Express:

1.  Salin `.env.example` menjadi `.env` dan sesuaikan port jika perlu.
2.  Instal dependensi: `npm install`.
3.  Jalankan server:
    *   **Development**: `npm run dev`
    *   **Production**: `npm start`

## Sumber Data

Terimakasih untuk [Tanggalan.com](https://tanggalan.com) yang sudah menyediakan data hari libur & hari penting lainnya 🙏

## Terima Kasih

Terima kasih untuk [satyakresna](https://github.com/satyakresna/) yang telah membuat [api-harilibur](https://github.com/satyakresna/api-harilibur). API ini terinspirasi berat dari beliau 🙏
