// SPDX-License-Identifier: Unlincesed
pragma solidity ^0.8.0;

contract CampaignFactory {
    address[] public deployedCampaigns;

    event campaignCreated(
        uint256 requiredAmount,
        address indexed owner,
        address campaignAddress,
        string imgURI,
        uint256 indexed timestamp
    );

    function create_campaign(uint256 _requiredAmount, string memory _imgURI)
        public
    {
        Campaign newCampaign = new Campaign(
            _requiredAmount,
            _imgURI,
            msg.sender
        );

        deployedCampaigns.push(address(newCampaign));

        emit campaignCreated(
            _requiredAmount,
            msg.sender,
            address(newCampaign),
            _imgURI,
            block.timestamp
        );
    }
}

contract Campaign {
    uint256 public requiredAmount;
    string public img;
    uint256 public recievedAmount;
    address payable public owner;

    event donated(address indexed donar, uint256 amount, uint256 timestamp);

    constructor(
        uint256 _requiredAmount,
        string memory imgURI,
        address sender
    ) {
        requiredAmount = _requiredAmount;
        img = imgURI;
        owner = payable(sender);
    }

    function donate() public payable {
        require(requiredAmount > recievedAmount, "Required Amount Fulfilled!");
        owner.transfer(msg.value);
        recievedAmount += msg.value;
        emit donated(msg.sender, msg.value, block.timestamp);
    }
}
