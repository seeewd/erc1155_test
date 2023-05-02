pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract DynamicNFT is ERC1155, Ownable {
    uint256 public constant DYNAMIC_NFT = 0;
    uint256 public tokenSupply;

    // Metadata URI
    string private _baseURI;

    // Mapping from token ID to metadata
    mapping(uint256 => string) private _tokenURIs;

    constructor(string memory baseURI) ERC1155(baseURI) {
        _baseURI = baseURI;
    }

    function setBaseURI(string memory newBaseURI) public onlyOwner {
        _baseURI = newBaseURI;
    }

    function uri(uint256 tokenId) public view virtual override returns (string memory) {
        return string(abi.encodePacked(_baseURI, _tokenURIs[tokenId]));
    }

    function mint(address to, uint256 tokenId, uint256 amount, string memory tokenURI) public onlyOwner {
        _mint(to, tokenId, amount, "");
        _tokenURIs[tokenId] = tokenURI;
        tokenSupply += amount;
    }

    function updateTokenURI(uint256 tokenId, string memory tokenURI) public {
    require(balanceOf(msg.sender, tokenId) > 0, "DynamicNFT: caller is not owner of the token");
    _tokenURIs[tokenId] = tokenURI;
}


    function burn(address account, uint256 tokenId, uint256 amount) public {
        require(msg.sender == account || isApprovedForAll(account, msg.sender), "DynamicNFT: caller is not owner nor approved");
        _burn(account, tokenId, amount);
        tokenSupply -= amount;
    }
}
