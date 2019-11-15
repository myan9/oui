/*
 * Copyright 2019 IBM Corporation
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

import { Arguments, Registrar } from '@kui-shell/core/api/commands'

import { standardListUsage } from '../usage'
import { asPackageTable } from './as-package'
import { getClient } from '../../client/get'
import { synonyms } from '../../lib/models/synonyms'
import { copy, nameForList, ListOptions } from '../options'

export default (registrar: Registrar) => {
  synonyms('packages').forEach(syn => {
    registrar.listen(`/wsk/${syn}/count`, ({ REPL }) => REPL.qexec<number>(`wsk package list --count`))

    registrar.listen(
      `/wsk/${syn}/list`,
      async ({ argvNoOptions, parsedOptions, execOptions }: Arguments<ListOptions>) => {
        const name = argvNoOptions[argvNoOptions.indexOf('list') + 1]
        const args = copy(parsedOptions, nameForList(name))

        const raw = await getClient(execOptions).packages.list(args)
        if (parsedOptions.count) {
          return ((raw as any) as { packages: number }).packages
        } else {
          return asPackageTable(raw)
        }
      },
      standardListUsage(syn)
    )
  })
}
