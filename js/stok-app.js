var app = new Vue({

  el: '#app',

  data: {

    stok: dataBahanAjar.stok,

    upbjjList: dataBahanAjar.upbjjList,

    kategoriList: dataBahanAjar.kategoriList,

    filterUpbjj: '',
    filterKategori: '',
    sortBy: '',
    warningOnly: false,

    form: {

      kode: '',
      judul: '',
      kategori: '',
      upbjj: '',
      lokasiRak: '',
      harga: '',
      qty: '',
      safety: '',
      catatanHTML: ''

    }

  },

  /* ================================= */
  /* COMPUTED */
  /* ================================= */

  computed: {

    filteredStok() {

      let hasil = [...this.stok];

      /* FILTER UPBJJ */

      if (this.filterUpbjj) {

        hasil = hasil.filter(item =>

          item.upbjj === this.filterUpbjj

        );

      }

      /* FILTER KATEGORI */

      if (this.filterKategori) {

        hasil = hasil.filter(item =>

          item.kategori === this.filterKategori

        );

      }

      /* FILTER WARNING */

      if (this.warningOnly) {

        hasil = hasil.filter(item =>

          item.qty < item.safety ||
          item.qty === 0

        );

      }

      /* SORT JUDUL */

      if (this.sortBy === 'judul') {

        hasil.sort((a, b) =>

          a.judul.localeCompare(b.judul)

        );

      }

      /* SORT STOK */

      if (this.sortBy === 'stok') {

        hasil.sort((a, b) =>

          a.qty - b.qty

        );

      }

      /* SORT HARGA */

      if (this.sortBy === 'harga') {

        hasil.sort((a, b) =>

          a.harga - b.harga

        );

      }

      return hasil;

    }

  },

  /* ================================= */
  /* METHODS */
  /* ================================= */

  methods: {

    /* STATUS STOK */

    statusStok(item) {

      if (item.qty === 0) {

        return 'Kosong';

      }

      if (item.qty < item.safety) {

        return 'Menipis';

      }

      return 'Aman';

    },

    /* TOGGLE WARNING */

    toggleWarning() {

      this.warningOnly =
        !this.warningOnly;

    },

    /* RESET FILTER */

    resetFilter() {

      this.filterUpbjj = '';
      this.filterKategori = '';
      this.sortBy = '';
      this.warningOnly = false;

    },

    /* TAMBAH DATA */

    tambahData() {

      if (

        this.form.kode === '' ||
        this.form.judul === '' ||
        this.form.kategori === '' ||
        this.form.upbjj === ''

      ) {

        alert('Data belum lengkap');

        return;

      }

      this.stok.push({

        kode: this.form.kode,

        judul: this.form.judul,

        kategori: this.form.kategori,

        upbjj: this.form.upbjj,

        lokasiRak: this.form.lokasiRak,

        harga: this.form.harga,

        qty: this.form.qty,

        safety: this.form.safety,

        catatanHTML: this.form.catatanHTML

      });

      /* RESET FORM */

      this.form = {

        kode: '',
        judul: '',
        kategori: '',
        upbjj: '',
        lokasiRak: '',
        harga: '',
        qty: '',
        safety: '',
        catatanHTML: ''

      };

      alert('Data berhasil ditambahkan');

    }

  },

  /* ================================= */
  /* WATCHERS */
  /* ================================= */

  watch: {

    /* RESET KATEGORI */

    filterUpbjj() {

      this.filterKategori = '';

    },

    /* MONITOR WARNING */

    warningOnly(value) {

      console.log(
        'Warning Filter:',
        value
      );

    }

  }

});