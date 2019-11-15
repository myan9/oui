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

import { Registrar } from '@kui-shell/core/api/commands'

import standardOptions from '../aliases'
import respondWith from './as-activation'
import { synonyms } from '../../lib/models/synonyms'
import { clientOptions, getClient } from '../../client/get'

export default (registrar: Registrar) => {
  synonyms('activations').forEach(syn => {
    registrar.listen(
      `/wsk/${syn}/result`,
      async ({ argvNoOptions, execOptions }) => {
        const name = argvNoOptions[argvNoOptions.indexOf('result') + 1]

        return respondWith(
          await getClient(execOptions).activations.get(
            Object.assign(
              {
                name
              },
              clientOptions
            )
          ),
          'result'
        )
      },
      standardOptions
    )
  })
}
