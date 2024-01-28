import React from "react"
import { Tab, Tabs, useMediaQuery } from "@mui/material"
import { useLocale } from "@/hooks/useLocale"

interface LanguageSelectorProps {}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { locale, locale_options, setLocale } = useLocale()

    return (
        <Tabs value={locale} onChange={(_, value) => setLocale(value)} variant="fullWidth" sx={{ width: isMobile ? "100%" : "5vw" }}>
            <Tab label={locale.header.languages.pt_br} value={locale_options.pt_br} sx={{ minWidth: 0 }} />
            <Tab label={locale.header.languages.en_us} value={locale_options.en_us} sx={{ minWidth: 0 }} />
        </Tabs>
    )
}
