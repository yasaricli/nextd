<div align="center">
  <img width="200" src="images/nextd.png">
</div>

> Deploy next.js applications to your own servers using SSH and SFTP. Pull and feature requests are encouraged.

## Installation

```
$ npm install -g nextd
```

Use -g flag to use nextd via the CLI

## Configuration

Imagine the following nextd.json:

    nextd --init

``` JS
{
  "name": "Nextjs App Name",
  "host": "192.0.0.100",
  "username": "ubuntu",
  "privateKey": "/Users/username/Desktop/server.pem",
  "remoteDirectory": "/home/ubuntu/appname_dir",
  "password": "",
  
  "env": {
    "API_URL": "0.0.0.0"
  }
}
```

### The deploy process

Builds your app, using nextd deploy

    nextd --deploy

* Uploads the app bundle, the start script, and the environment variables to your servers
* Runs the start script
* Verifies that the app sucessfully started

> Congratulations! Your app is now running on the server, accessible to your potential users!

#### Standard options
* **name** The application name.
* **host** The server you want to deploy to. Has to have an SSH server with SFTP subsystem.
* **user** The username to use for the SSH connection.
* **privateKey** The private key file for your SSH user.
* **remoteDirectory** The absolute path on the server where you want to run the app.

### Help
```bash
Usage: nextd [options] [command]

  Commands:
    deploy                 Deploys the git repository to a remote server.

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -f, --forever        Attempt to start/restart the program on the server using forever.
```
