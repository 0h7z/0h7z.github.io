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

export type Entries<T> = [keyof T, T[keyof T]][]
export type Merge2<T1, T2> = Omit<T1, keyof T2> & T2
export type Merge3<T1, T2, T3> = Merge2<Merge2<T1, T2>, T3>
export type Reduce<T> = {} & { -readonly [K in keyof T]: T[K] }

export const entriesof = <T extends {}>(x: T) => Object.entries(x) as Entries<T>
export const json = (x: object) => `${JSON.stringify(x, undefined, `\t`)}\n`
