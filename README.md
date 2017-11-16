# NPM Token Switch

[![Build Status](https://travis-ci.org/meister/npm-token-switch.svg?branch=master)](https://travis-ci.org/meister/npm-token-switch)

A command line tool for changing between your existing NPM registry access
tokens.

## Installation

The tool requires at least Node v6 to run. To install `npm-token-switch`, just
run following command:
```
npm install -g npm-token-switch
```

## Usage

Every time you run `npm-token-switch`, it will create a backup of your current
active token. Once that has been done, it will prompt you to change between
saved tokens. So when using multiple accounts, follow these steps:

1. Run `npm-token-switch` to create a backup of currently active token
2. Run `npm login` to change to a different account
3. Run `npm-token-switch` to toggle between accounts

## Using login without username/password

The real purpose of this tool is to switch between tokens without needing to
have login data. At times you may get read-only access to private tools, but
without a password.

In cases where you have a token for a user, but not actual password,
you can easily add it to the `npm-token-switch` list:

```
echo "//registry.npmjs.org/:_authToken=your-npm-token" > ~/.npmrc.token.account-name
chmod 600 ~/.npmrc.token.account-name
```

Of course replacing `your-npm-token` and `account-name` in the command and make
sure to set the file permissions to protect your token.

## License

[MIT](https://github.com/meister/npm-token-switch/blob/master/LICENSE)