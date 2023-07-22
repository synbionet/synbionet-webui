import { createTestClient, http } from 'viem'
import { foundry } from 'viem/chains'
import * as fs from 'fs'

export const testClient = createTestClient({
  chain: foundry,
  mode: 'anvil',
  transport: http(),
})
  .extend((client) => ({
    async anvilDumpState() {
      return client.request({
        method: 'anvil_dumpState',
        params: [],
      })
    },
  }))
  .extend((client) => ({
    async anvilLoadState(state) {
      return client.request({
        method: 'anvil_loadState',
        params: [state],
      })
    },
  }))
  .extend((client) => ({
    async getNodeInfo() {
      return client.request({
        method: 'anvil_nodeInfo',
        params: [],
      })
    },
  }))
  .extend((client) => ({
    async mine(numBlocks) {
      return client.request({
        method: 'anvil_mine',
        params: [numBlocks],
      })
    },
  }))

async function dumpState() {
  const response = await testClient.anvilDumpState()

  fs.writeFile('./state', response, (err) => {
    if (err) {
      console.error('Error writing to the file:', err)
    } else {
      console.log('File saved successfully!')
    }
  })
}

async function loadState() {
  fs.readFile('./state', 'utf8', async (err, data) => {
    if (err) {
      console.error('Error reading file:', err)
    } else {
      // console.log({ data })
      await testClient.anvilLoadState(data)
    }
  })
}

async function getNodeInfo() {
  console.log(await testClient.getNodeInfo())
}

async function mineBlocks(numBlocks) {
  await testClient.mine(numBlocks)
}

mineBlocks(5)
loadState()
// dumpState()
// getNodeInfo()
