# Introduction

This just a POC project for Online game store. Steam game store concept build on NEM blockchain, which mean user allow to using web applicaiton to purchase game (activation code) from the store.

NEM has powerful messaging feature, by using messaging feature, it allow user to purchase a game and received actication code from message in NEM blockchain.

NEM Blockchain is API driven, and with super easy to use SDK, it's easy to build an applicaiton on NEM Blockchain.

This project is build on [React App](https://github.com/facebook/create-react-app) with [material-ui theme](https://github.com/mui-org/material-ui) and using [NEM Library SDK](https://github.com/aleixmorgadas/nem-library-ts).

Server is build on [Nodejs](https://nodejs.org/en/docs/guides/getting-started-guide/).

## NEM-Steam-Store

[NEM-Steam-Store](https://github.com/AnthonyLaw/nem-steam-store) is a web base application, it allow user to purchase a game from the store. In the applicaiton you will received NEM's encrypted message after purchased the game from store. But in application it will decrypted the message and show activation code.
Tx example: [Purchase game](http://bob.nem.ninja:8765/#/transfer/ad7de767f87b15feb4de3fc5587227a07aa7d5b77f1efd5bbd864c7804df17c0)

## NEM-Steam-Store-Server

[NEM-Steam-Store-Server](https://github.com/AnthonyLaw/nem-steam-store-server) is host with Store account, which is listening incoming transaction from the account address. When received fund from buyer, the server will trigger a NEM's encrypted message which content of activaiton code to the buyer account address.
Tx example: [Invoice for the game (encrypted)](http://bob.nem.ninja:8765/#/transfer/455380757e87c7245f2b20543c27330de1039f6e977c0ddd7d6bd6f655763b2d).

## Setup NEM-Steam-Store (Reactjs)

1.  `git clone https://github.com/AnthonyLaw/nem-steam-store`.
2.  `cd nem-steam-store`.
3.  create `.env` file in root.
    ```
    REACT_APP_PRIVATE_KEY= address private key
    REACT_APP_ADDRESS= your address
    REACT_APP_STEAMSTORE_ADDRESS= store address from server
    REACT_APP_STEAMSTORE_PK= store public key from server
    ```
4.  `npm install`
5.  `npm start`
6.  Open [http://localhost:3000](http://localhost:3000/) to view it in the browser.

## Setup NEM-Steam-Store-Server (nodejs)

1.  `git clone https://github.com/AnthonyLaw/nem-steam-store-server`.
2.  `cd nem-steam-store-server`.
3.  create `.env` file in root.
    ```
    NEM_PRIVATE_KEY= store private key
    NEM_ADDRESS= store address
    ```
4.  `npm install`
5.  `npm start`

## Summary

Always running [NEM-Steam-Store-Server](https://github.com/AnthonyLaw/nem-steam-store-server) first and then using [NEM-Steam-Store](https://github.com/AnthonyLaw/nem-steam-store) to make purchase.

Make sure account address have enough (xem) to make transaction.

## Feedback

Welcome every giving feedback, create issue or pull request. :)
