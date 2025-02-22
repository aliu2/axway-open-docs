{"title":"Configure database server","linkTitle":"Configure database server","weight":"4","date":"2019-08-09","description":"Configure your MySQL or MariaDB database server before you install API Portal."}

## Configure the database server settings

Connect to your MySQL or MariaDB database, and configure the database for API Portal in the `/etc/my.cnf` configuration file as follows:

1.  To restrict the interfaces the database listens on, under the `[mysqld]` line, add the following:
    
    `bind-address = 127.0.0.1`

3.  Set the value for `expire_logs_days`. The default is `0`, no automatic removal.
4.  Set the maximum size of the binary log file in `max_binlog_size`.
5.  Set the maximum number of connections in `max_connections`. The default is `151`.
6.  Set `sql_mode` to `NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES`.
7.  Set the size of the buffer pool in `innodb_buffer_pool_size`.
8.  Set the size of the log files in a log group in `innodb_log_file_size`.
9.  Set the size of database storage to a minimum of 100 MB. This is the recommended value for the most common environments, which include the use of blog posts, forums, comments, and so on.

For more details on the variables and how they affect the performance of the database server, see [MySQL Server System Variables](https://dev.mysql.com/doc/refman/5.6/en/server-system-variables.html) or [MariaDB Server System Variables](https://mariadb.com/kb/en/mariadb/server-system-variables/).

## Configure the database server for secure connection

If you have a remote MySQL or MariaDB database server, you must configure it to use a secure connection between the database and your API Portal installation. After configuring your database server, you are prompted during the API Portal installation to use the secure connection.

To generate the SSL-RSA certificates and enable SSL in the MySQL or MariaDB server, connect to your database server and perform the following steps.

### Step 1 - Generate RSA certificates

You must first create the database server and the client certificate and key files. During the process, you must respond to several prompts from the Open SSL commands:

-   To generate test files, press Enter to all prompts.
-   To generate files for production use, provide actual (non-empty) responses.

{{< alert title="Note" color="primary" >}}Enter different domain names for the CA and the client-server certificate.{{< /alert >}}

1.  To create the RSA certificates, enter the following commands in the given order, and respond to any prompts you receive:

    `openssl genrsa 2048 > /etc/mysql/certs/ca-key.pem`

    `openssl req -new -x509 -nodes -days 3600 -key /etc/mysql/certs/ca-key.pem > /etc/mysql/certs/ca.pem`

    `openssl req -newkey rsa:2048 -days 3600 -nodes -keyout /etc/mysql/certs/server-key.pem > /etc/mysql/certs/server-req.pem`

    `openssl x509 -req -in /etc/mysql/certs/server-req.pem -days 3600 -CA /etc/mysql/certs/ca.pem -CAkey /etc/mysql/certs/ca-key.pem -set_serial 01 > server-cert.pem`

    `openssl req -newkey rsa:2048 -days 3600 -nodes -keyout client-key.pem > client-req.pem`

    `openssl x509 -req -in client-req.pem -days 3600 -CA /etc/mysql/certs/ca-cert.pem -CAkey /etc/mysql/certs/ca-key.pem -set_serial 01 > client-cert.pem`

3.  To verify the generated certificate, enter the following command:

    `> openssl verify -CAfile ca.pem server-cert.pem client-cert.pem`

### Step 2 - Enable secure connection in the database server

To enable secure connection in the MySQL or MariaDB server-side configuration, do the following:

1.  To start the database server so that it permits clients to connect securely, use options that identify the certificate and key files the server uses when establishing a secure connection:
    -   `--ssl-ca` identifies the Certificate Authority (CA) certificate.
    -   `--ssl-cert` identifies the server public key certificate. This can be sent to the client and authenticated against the CA certificate the client has.
    -   `--ssl-key` identifies the server private key.

3.  Edit the `/etc/my.cnf` file as follows to configure the certificates:

    `[mysqld]`

    `...`

    `ssl-ca=/<path>/ca.pem`

    `ssl-cert=/<path>/server-cert.pem`

    `ssl-key=/<path>/server-key.pem`

    Replace the `<path>` placeholders with the path to your certificates.

5.  Save the file and restart the database:

    `> service mysqld restart`

### Step 3 - Verify the configuration

After configuring the MySQL or MariaDB database server with certificates, you need to make sure SSL is enabled on the server side.

1.  Log in to the database server as the `root` user:

    `> MySQL -u root –p <password>`

3.  Enter the following command:

    `> show variables like '%ssl%';`

You should get output similar to the one below:

![Example output for the MySQL settings](/Images/APIPortal/mysql_ssl_settings.png)

After you have successfully enabled SSL on the server, you must configure user authentication mode before you can use the secure connection. For more details, see [Configure the database server settings](#Configur).

## Create a database and a user account for API Portal

You must create a database for API Portal to store your configuration data on the database server. Log in to the database server and enter the following:

`CREATE DATABASE <database name>;`

Make a note of your database name and port, as you must provide them when installing API Portal. For more details, see [MySQL documentation](https://dev.mysql.com/doc/refman/5.6/en/) or [MariaDB documentation](https://mariadb.com/kb/en/mariadb/documentation/).

In addition, for API Portal to be able to connect to the MySQL or MariaDB database, you must configure a user account for API Portal on your database.

You must configure a strong password for this user account or the API Portal installation will not succeed. The password requirements are:

-   At least 10 characters long
-   Contains at least one digit
-   Contains at least one uppercase letter
-   Contains at least one lowercase letter
-   Contains at least one special character `!@#$%^&*`

### Configure a user account without authentication

If you do not want to use a secure connection, you can configure API Portal to use a user account without authentication.

1.  Connect to your database server.
2.  To configure a user account, enter the following:

    `CREATE USER '<user name>'@'<your API Portal host IP address>' IDENTIFIED BY '<your password>';`

    `GRANT ALL PRIVILEGES ON <database name>.* TO '<user name>'@'<your API Portal host>' IDENTIFIED BY '<your password>' WITH GRANT OPTION;`

    `GRANT ALL PRIVILEGES ON <database name>.* TO '<user name>'@'<your API Portal host>' IDENTIFIED BY '<your password>' WITH GRANT OPTION;`

    `FLUSH PRIVILEGES;`

    Replace the placeholders with the actual values.

### Configure a user account with TLS authentication

MariaDB and MySQL 5.7 support one-way and two-way authentication modes. Authentication modes are handled based on the User Grant.

-   **One-way (Server CA) authentication**: One-way authentication mode expects the client to provide a CA file generated in database server.
-   **Two-way (mutual) authentication**: Two-way authentication mode expects the client to provide both the CA and the client certificates generated in database server.

#### Configure one-way authentication

To enable one-way authentication, create a user with the option `REQUIRE SSL`.

1.  Log in to the database server as the `root` user and enter the following:

    `> CREATE USER '<user name>'@’%’ IDENTIFIED BY '<password>' REQUIRE SSL;`

    `> GRANT ALL PRIVILEGES ON *.* TO '<user name>'@'%' WITH GRANT OPTION;`

    `> FLUSH PRIVILEGES;`

    Replace the placeholders with the user name and password you want to use.

3.  Copy the `ca.pem` CA certificate to a folder (for example, `/etc/mysql/certs/`) on the machine where you installed API Portal.
4.  To test the connection between the database client and server, enter the following:

    `> MySQL --ssl-ca=/etc/mysql/certs/ca.pem -h xxx.xxx.xxx.xxx --port="3306" -u <user name> --password="<password>"`

#### Configure two-way (mutual) authentication

To enable two-way authentication, create a user with the option `REQUIRE X509`.

1.  Log in to the database server as the `root` user and enter the following:

    `> CREATE USER '<user name>'@’%’ IDENTIFIED BY '<password>' REQUIRE X509L;`

    `> GRANT ALL PRIVILEGES ON *.* TO '<user name>'@'%' WITH GRANT OPTION;`

    `> FLUSH PRIVILEGES;`

    Replace the placeholders with the user name and password you want to use.

3.  Copy the following client certificates to a folder (for example, `/etc/mysql/certs/`) on the machine where you installed API Portal:
    -   `client-key.pem`
    -   `client-cert.pem`
    -   `ca.pem`

5.  To test the connection between the database client and server, enter the following:

    `> MySQL --ssl-ca=/etc/mysql/certs/ca.pem --ssl-cert=/etc/mysql/certs/client-cert.pem --ssl-key=/etc/mysql/certs/client-key.pem -h xxx.xxx.xxx.xxx --port="3306" -u <user name> --password="<password>"`
