export interface EnumListItem<TEnum> {
    value: string;
    key: keyof TEnum;
}

export type EnumList<TEnum> = EnumListItem<TEnum>[];

export function enumList<TEnum>(_enum: TEnum): EnumList<TEnum> {
    return Object.keys(_enum).map(value => <EnumListItem<TEnum>>{value: _enum[value], key: value});
}
