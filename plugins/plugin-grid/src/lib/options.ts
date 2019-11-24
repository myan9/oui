/*
 * Copyright 2017, 2019 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ParsedOptions } from '@kui-shell/core/api/commands'

export interface Options extends ParsedOptions {
  name?: string
  live?: boolean
  batches?: number

  groupBySuccess?: boolean
  buckets?: number
  nBuckets?: number
  full?: boolean
  outliers?: true | number
  split?: string | true
}

export interface TableOptions extends Options {
  w?: boolean
  ww?: boolean
  ticks?: number
}

export interface GridOptions extends Options {
  zoom?: number
  full?: boolean
  appName?: string
  fixedHeader?: boolean
  timeline?: boolean | 'latency' | 'time'
}