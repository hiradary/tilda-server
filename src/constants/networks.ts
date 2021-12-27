interface BlockchainNetwork {
  name: string
  symbol: string
}

const BLOCKCHAIN_NETWORKS: BlockchainNetwork[] = [
  {
    name: 'Ethereum',
    symbol: 'ERC-20',
  },
  {
    name: 'Binance SmartChain',
    symbol: 'BEP-20',
  },
  {
    name: 'Binance Chain',
    symbol: 'BEP-2',
  },
  {
    name: 'Tron',
    symbol: 'TRC-20',
  },
]

export { BLOCKCHAIN_NETWORKS }
