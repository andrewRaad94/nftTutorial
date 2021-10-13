pragma solidity >=0.7.0 <0.9.0;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";



contract Color is ERC721Enumerable {
	string[] public colors; 
	mapping (string => bool) _colorExists;

	constructor() ERC721("Color","COLOR") {


	}
	
	function mint(string memory _color)  public {

	//Require a unique color
	require(!_colorExists[_color]);
	//Color add it
	colors.push(_color);
	uint _id = colors.length;
	_mint( msg.sender,_id);
	_colorExists[_color] = true;

	//Call the mint function


	//Color - Track it
	}
}

