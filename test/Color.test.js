var Color = artifacts.require("./Color.sol");


require('chai')
	.use(require('chai-as-promised'))
	.should()


contract('Color', (accounts) => {
	let contract

	before(async() => {
		contract = await Color.deployed() 
	})

	describe('deployment', async() => {
		it ('deploys contracts', async() => {
			const address = contract.address
			console.log(address)
			assert.notEqual(address, 0x0)
			assert.notEqual(address, '')
			assert.notEqual(address, null)
			assert.notEqual(address, undefined)
		})

		it ('it has a name', async() => {
			const name = await contract.name()
			const symbol = await contract.symbol()
			assert.equal(name, "Color")
			assert.equal(symbol, "COLOR")

		})

		it ('checks the color', async() => {
			const result = await contract.mint("#cdad00")
			const totalSupply = await contract.totalSupply() 
			assert.equal(totalSupply,1)
			const event = result.logs[0].args
			console.log(event.tokenId.toNumber())
			assert.equal(event.tokenId.toNumber(),1)
			assert.equal(event.to, accounts[0])

			await contract.mint("#cdad00").should.be.rejected;
		})
	})

	describe('indexing', async() => {
		it ('list colors', async() => {
			await contract.mint("#0000ff")
			await contract.mint("#219264")
			await contract.mint("#110088")
			const totalSupply = await contract.totalSupply()

			let color
			let result = []

			for (var i = 1; i <=totalSupply; i++) {
				color = await contract.colors(i-1)
				result.push(color)
			}

			let expected = ["#cdad00","#0000ff","#219264","#110088"]
			assert.equal(result.join(','), expected.join(','))
		})
	})
})