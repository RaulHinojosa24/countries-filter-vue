Vue.createApp({
    data() {
        return {
            isDarkTheme: true,
            countries: [],
            selectFilter: "",
            inputFilter: "",
            modalCountry: ""
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            this.countries = await fetch("https://restcountries.com/v2/all")
                .then(response => response.json());
        },
        setModalCountry(code) {
            console.log(code);
            this.modalCountry = this.countries.filter(c => c.alpha3Code == code)[0];
            console.log(this.modalCountry);
        },
        hideCountryModal() {
            this.modalCountry = "";
        }
    },
    computed: {
        filteredCountries() {
            const inputRegex = new RegExp(this.inputFilter, 'i');
            const selectRegex = new RegExp(this.selectFilter, 'i');

            return this.countries.filter(country => {
                if (country.name.match(inputRegex) && country.region.match(selectRegex)) {
                    return true;
                }

                return false;
            });
        }
    },
}).mount("#app");