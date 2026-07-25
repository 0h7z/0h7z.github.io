/*
 * Copyright (C) 2024-2026 Heptazhou <zhou@0h7z.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

export type Entries<T> = Array<[keyof T, T[keyof T]]>
export type Merge2<T1, T2> = Omit<T1, keyof T2> & T2
export type Merge3<T1, T2, T3> = Merge2<Merge2<T1, T2>, T3>
export type Pair<K = any, V = any> = readonly [K, V]
export type Pairs<K = any, V = any> = Iterable<Pair<K, V>>
export type Properties<K extends PropertyKey = string, V = K> = Pairs<K, V>
export type Property<K extends PropertyKey = string, V = K> = Pair<K, V>
export type Reduce<T> = {} & { -readonly [K in keyof T]: T[K] }

export const { min, max } = Math
export const json = (x: object) => `${JSON.stringify(x, undefined, `\t`)}\n`
export const obj2vec = <T extends {}>(x: T) => Object.entries(x) as Entries<T>
export const vec2obj = <K extends PropertyKey, V>(x: Properties<K, V>) => Object.fromEntries(x)
