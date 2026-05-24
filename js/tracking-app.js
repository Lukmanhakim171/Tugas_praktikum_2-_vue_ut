var trackingApp = new Vue({

  el: '#trackingApp',

  data: {

    paket: dataBahanAjar.paket,

    pengirimanList: dataBahanAjar.pengirimanList,

    tracking: dataBahanAjar.tracking,

    selectedPaket: null,

    form: {
      nim: '',
      nama: '',
      ekspedisi: '',
      tanggalKirim: ''
    }

  },

  computed: {

    nomorDO() {

      const tahun = new Date().getFullYear();

      const jumlah =
        Object.keys(this.tracking).length + 1;

      const nomor =
        String(jumlah).padStart(4, '0');

      return `DO${tahun}-${nomor}`;

    },

    totalHarga() {

      if (this.selectedPaket) {
        return this.selectedPaket.harga;
      }

      return 0;

    }

  },

  methods: {

    tambahTracking() {

      if (
        this.form.nim === '' ||
        this.form.nama === ''
      ) {

        alert('Data belum lengkap');
        return;

      }

      this.$set(this.tracking, this.nomorDO, {

        nim: this.form.nim,

        nama: this.form.nama,

        status: 'Diproses',

        ekspedisi: this.form.ekspedisi,

        tanggalKirim: this.form.tanggalKirim,

        paket: this.selectedPaket.kode,

        total: this.totalHarga,

        perjalanan: [
          {
            waktu: new Date().toLocaleString(),
            keterangan: 'Pesanan dibuat'
          }
        ]

      });

      this.form = {
        nim: '',
        nama: '',
        ekspedisi: '',
        tanggalKirim: ''
      };

      this.selectedPaket = null;

    }

  },

  watch: {

    selectedPaket(value) {

      if (value) {
        console.log('Paket dipilih:', value.nama);
      }

    },

    'form.ekspedisi'(value) {

      console.log('Ekspedisi:', value);

    }

  }

});