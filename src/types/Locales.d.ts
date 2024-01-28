declare type LocaleOptions = "pt_br" | "en_us"

declare type Locales = {
    pt_br: Locale
    en_us: Locale
}

declare interface Locale {
    header: {
        languages: {
            pt_br: string
            en_us: string
        }

        navigation: {
            home: string
        }
    }

    login: {
        username: string
    }
}
