import { useContext } from "react"
import LocaleContext from "../contexts/localeContext"

export const useLocale = () => {
    const localeContext = useContext(LocaleContext)
    const { locale, locale_options, setLocale } = localeContext

    const changeLocale = (locale: LocaleOptions) => {
        localeContext.setLocale(locale_options[locale])
    }

    return { locale, changeLocale, locale_options, setLocale }
}
