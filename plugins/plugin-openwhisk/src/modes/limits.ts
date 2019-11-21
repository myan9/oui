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

import { WithLimits, hasLimits } from '../lib/models/resource'

/**
 * The Code mode applies to all Action resources.
 *
 */
export default {
  when: hasLimits,
  mode: {
    mode: 'limits',

    content: async (_, resource: WithLimits) => {
      const { safeDump } = await import('js-yaml')
      return {
        content: safeDump(resource.limits),
        contentType: 'yaml'
      }
    }
  }
}