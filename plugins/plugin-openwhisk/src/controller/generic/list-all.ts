/*
 * Copyright 2017-18 IBM Corporation
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

/**
 * This plugin introduces /wsk/list, which lists entities across all entity types.
 *
 */

import Debug from 'debug'

import { Arguments, Registrar } from '@kui-shell/core/api/commands'
import Tables from '@kui-shell/core/api/tables'

import { withStandardOptions } from '../usage'

const debug = Debug('plugins/openwhisk/cmds/list-all')

/** usage model */
const usage = withStandardOptions({
  command: 'list',
  strict: 'list', // enforce no positional or optional arguments
  title: 'List all',
  header: 'List all deployed entities',
  example: `wsk list`
})

/** list all of these entity types: */
const types = ['actions', 'packages', 'triggers', 'rules']

/** list the entities of a given type */
const list = ({ REPL }: Arguments) => (type: string) =>
  REPL.qexec<Tables.Table>(`wsk ${type} list`, undefined, undefined, { showHeader: true })

/** the command handler */
const doList = async (command: Arguments) => {
  const response = await Promise.all(types.map(list(command))).then(result => {
    return result.filter(
      res =>
        (Tables.isTable(res) && res.body.length > 0) ||
        (Tables.isMultiTable(res) && res.tables.every(table => table.body.length > 0))
    )
  })

  debug('list-all result', response)

  if (Array.isArray(response) && response.length > 0) {
    return response.length === 1 ? response[0] : { tables: response }
  }

  return response
}

/**
 * Here is the module, where we register command handlers
 *
 */
export default (registrar: Registrar) => {
  registrar.listen(`/wsk/list`, doList, usage)
}