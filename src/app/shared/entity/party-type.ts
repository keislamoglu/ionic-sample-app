export enum PartyType {
    Injured = 'Mağdur', // Mağdur
    Suspected = 'Şüpheli', // Şüpheli
    Defendant = 'Sanık', // Sanık
    Complainant = 'Müşteki', // Müşteki
    InjuredRepresentative = 'Mağdurun vekili', // Mağdurun vekili
    SuspectedRepresentative = 'Şüphelinin vekili', // Şüphelinin vekili
    InjuredAdvocate = 'Mağdurun müdafisi', // Mağdurun müdafisi, avukatı
    SuspectedAdvocate = 'Şüphelinin müdafisi', // Sanığın / Şüphelinin müdafisi, avukatı
    InjuredLegalDelegate = 'Mağdurun kanuni temsilcisi', // Mağdurun kanuni temsilcisi
    SuspectedLegalDelegate = 'Şüphelinin kanuni temsilcisi', // Sanığın / Şüphelinin kanuni temsilcisi
    ComplainantsLegalDelegate = 'Müştekinin kanuni temsilcisi', // Müştekinin kanuni temsilcisi
    AffectedByCrimesLegalDelegate = 'Suçtan zarar görenin kanuni temsilcisi', // Suçtan zarar görenin kanuni temsilcisi
    AffectedByCrime = 'Suçtan zarar gören', // Suçtan zarar gören
    Translator = 'Tercüman',
    Other = 'Diğer'
}
