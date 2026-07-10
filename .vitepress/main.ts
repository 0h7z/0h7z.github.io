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

export * from "../src/main"
export type { PropertiesHyphen as CSS } from "csstype"
import { useTemplateRef } from "vue"
import locale from "./locale.json"
import type { ShallowRef } from "vue"

export type Language = keyof typeof locale.language
export type TemplateRef = Readonly<ShallowRef<HTMLElement>>

export const refTemplate = (ref: string) => useTemplateRef(ref) as TemplateRef
