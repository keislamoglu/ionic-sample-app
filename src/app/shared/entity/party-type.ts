export enum PartyType {
    Injured = 'Mağdur', // Soruşturma aşamasında
    Intervening = 'Katılan', // Mağdur'un kovuşturma aşamasındaki sıfatı
    Suspected = 'Şüpheli', // Soruşturma aşamasında
    Defendant = 'Sanık', // Şüpheli'nin kovuşturma aşamasındaki sıfatı
    Complainant = 'Müşteki',
    AffectedByCrime = 'Suçtan zarar gören',
    JuvenilePushedToCrime = 'Suça sürüklenen çocuk',
    LegalDelegate = 'Kanuni Temsilci',
    Representative = 'Vekil',
    Advocate = 'Müdafi',
    Translator = 'Tercüman',
    Other = 'Diğer'
}
