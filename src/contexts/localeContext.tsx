"use client"

import { en_us } from "@/locales/en_us"
import { pt_br } from "@/locales/pt_br"
import { createContext, useState } from "react"
import React from "react"

interface LocaleContextValue {
    locale: Locale
    setLocale: (value: Locale) => void

    locale_options: Locales
}

interface LocaleProviderProps {
    children: React.ReactNode
}

const LocaleContext = createContext<LocaleContextValue>({} as LocaleContextValue)

export default LocaleContext

export const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
    const locale_options: Locales = {
        pt_br,
        en_us
    }

    const [locale, setLocale] = useState<Locale>(locale_options.pt_br)

    return <LocaleContext.Provider value={{ locale, setLocale, locale_options }}>{children}</LocaleContext.Provider>
}
