# My First Ever Homelab

This is not only my first ever full documentation through a project I completed, my first ever
attempt at creating a homelab, and my first ever long-term project that I actually see myself
accessing and using every single day, BUT it's also my first blog. SO let's get into it.

## My Goals

I want to preface not only this blog but also this entire project by saying, I am not looking for
many to read through this (in fact I'd imagine no one will ever look through this), but I am still
excited to finally be writing a blog. I think it will not only be easier for me as I work through my
projects to document the steps I took, but also to be able to look back and visualize my thinking process
and see how it evolves.

Having said that, going into this homelab, I had a couple goals. I've been meaning to do some sort of
cyber project for a while, and due to university and an... interesting infrastructure at Northeastern University
that I did not feel ready to tackle, I hadn't gotten around to it. With the start of winter break, and access
to some old laptops, I knew I wanted to self-host a couple things on my own. Not really knowing what I was getting into,
I knew I wanted to at the very least, learn about:

- How do domains work, and seriously, how do I get one of my own.
- What is a tunnel, what is Tailscale, how can I possibly open a self-hosted device without having my home internet hacked
- Make some sort of environment (going into the project, I am hoping proxmox) secure and available from anywhere
- Fix the storage problem on my family and I's devices (phones)
- Be ready to build upon what I have and run experiments on new VMs, without having to worry about clutter on my laptop

## My Process

Starting this project, I honestly didn't know where to start. I knew I wanted to set up proxmox and knew that it was
one of the more popular virtualization platforms. As for how to access it, I had heard options like Tailscale or opening it to the internet
but didn't really know how to set any of those up or what these really meant or looked like. Even if I did, I was didn't know if
those were even my best options. Even if I'm starting out, the whole idea of creating a homelab is to make the bootup/access easy
and less painful than using other services isn't it?

Then started my journey of looking for the best options and services that would allow me to make what I had ultimately envisioned
for my homelab. With no one to brainstorm with and a desire to have spend as little money as possible, I turned to Claude. I knew some of the
things I wanted to create on my homelab already, as well as how I want to be able to access them. Form there, I spent some time talking to Claude,
asking about things like network segmentation and how that looks visually, how Tailscale actually worked and what I'd need to do to access my
services through it, and finally what a Cloudflare tunnel is.

In the end, I decided on a cloudflare tunnel, partly because of the cloudflare name, partly because I'd be able to choose which service to
add a tunnel for, and partly because Claude said I'd be able to get a free subdomain via Cloudflare (which ended up being wrong).

## Proxmox and Laptop Setup - Restarting Over and Over

From what I understand how, Proxmox is a virtualization platform that allows you to manage an create virtual machines that run on the
hardware that proxmox is installed on. I had already begun trying to set up Proxmox on a Thinkpad I picked up at [MIT SwapFest](https://w1mx.mit.edu/flea-at-mit/),
but upon getting to the networking part of the graphical installation and realizing after a couple google searches that I needed ethernet, I
put off the installation until I was due to go back home. After getting home and realizing the laptop I got didn't have an ethernet port (a Thinkpad without an ethernet port is ridiculous),
I started brand new with an even older laptop I had laying around.

Since I was going to use a cloudflare tunnel, I didn't have to do anything like network segmentation before the install and was able to follow the installation like normal.
Once I logged into root, and verified that I could hit proxmox at the default localhost:8006, I immediately started thinking about how to reduce my electricity bill.

I wanted this laptop to run 24/7, and since setting up WOL would require me to set up port forwarding (a big reason why I chose to use a cloudflare tunnel),
I really didn't want this home server to become a financial burden. I ended up setting up services and startup scripts to:

1. Turn off the screen after 15 seconds of inactivity (in case it ever turns off and I need to text someone to turn it back on and do anything)
2. Turning off keyboard backlighting and power button lighting
3. Forcing the laptop to stay on while the lid was closed and turning off the backlight of the screen
4. Disabling the built-in GPU and USB ports

Now that my power consumption was basically negligible, I wanted to make my proxmox available from everywhere so it wouldn't be useless when I was back at school.

After making the realization that I was going to need a domain, I reluctantly signed up for one using the Github Student Developer Pack. After
signing up for free Cloudflare account, registering my domain in cloudflare, and adding cloudflare's nameservers to my DNS providers, I was finally able
to log into cloudflare by running `cloudflared tunnel login` and create a tunnel on my proxmox machine with `cloudflared tunnel create homelab` (`homelab` being the name of my tunnel).

Using the tunnel id that came from running the `cloudflared tunnel create` command, I was able to create a configuration file that pointed the website url I wanted,
to the proxmox service being run on localhost:8006. One important thing to note is, since cloudflared forces https connections, the configuration file needs to have
the following after the service you want you to direct the hostname to:

```yaml
originRequest:
  noTLSVerify: true
```

From there, I created the DNS route using `cloudflared tunnel route dns <tunnel name> <subdomain.domain>` and kept it persistent by adding it to the
cloudflared service (`cloudflared service install`) and enabling the service to start on boot. After typing in my domain on my phone and hitting enter...

I connected right to proxmox! I did pretty much all I wanted with proxmox for now, but spent some time setting up email verification upon hitting the site, restricting it only to my emails,
and adding an ssh key to the proxmox machine for more security (and to avoid needing to log in with a password every time). Otherwise, it was time to move
on to actually using proxmox to set up the things I wanted, the first being a **media server**.

## Media Server - PROGRESS!

With proxmox set up and accessible from my domain, the most difficult part was over.

Now to move on to why I wanted a Proxmox environment in the first place: controlling x amount of space to perform y task all managed in one platform.
Up first is my media server, as my phone is reaching the end of its storage pool and my family has been asking me to move their phone photos to a usb.

First up was choosing which media service to use. I'm sure there are many options for a media server but the ones I was stuck on were
[Immich](https://immich.app/) and [Nextcloud](https://nextcloud.com/). While Immich optimized for the best photo and video uploading and viewing experience,
Nextcloud had a lighter and more file storage approach. Things like face recognition and timeline view were appealing from Immich but I ended up choosing
Nextcloud because I was hoping this media server to really be a storage server where I can put my documents and upload my photos.

I now wanted to start the process of actually installing Nextcloud, and the first minor difficulty was actually with Proxmox. Having owned and barely used
a virtualization platform before, I was a little confused on how I was going to get ISOs into proxmox or what I needed to do to create VMs. To that end, I
spent some time on my proxmox just googling all these questions and learning: how to download at least an Ubuntu server and Windows ISO for VMs, what an
LXC container is and its pros/cons compared to traditional VMs, all the settings and optimizations I can work with when creating, managing, and taking down VMs.

Once that was finished, it was time to actually create the machine (for lack of a better word) that my Nextcloud instance was going to live on.
For this, I chose to install it on an LXC container for a couple reasons. Partially, since I had just learned what an LXC container was (shiny object syndrome is what I call it)
but mostly because for a low performance/lightweight service like Nextcloud, it seemed perfect.

Next, I needed to figure out how to actually install Nextcloud, and it was here that I learned what Nextcloud actually was. Looking at tutorials I found
on how to install Nextcloud, I was confused on why something like Apache and MariaDB were being mentioned. After doing the research, I realized that
instead of a service that handles everything on its own, Nextcloud was a web app that sits on top of web servers (Apache), stores data in a relational database (MariaDB), all
configured by the app's home language (PHP). This makes a lot of sense considering what Nextcloud is, and honestly I am a little embarrassed that I didn't
look into it before deciding to install it, but we go on.

I started by installing tools and services with the following bash commands and began with setting up the database. Since
I didn't want to focus too much on database setup, I used the script that comes with mariadb: `mysql_secure_installation`. Then I created a database user that
would act as an admin with `mysql -u root -p` and gave it a password and then created a nextcloud database that nextcloud would be able to store files into with
this sequence of commands:

```bash
apt update && apt upgrade -y
apt install -y apache2 mariadb-server libapache2-mod-php \
  php php-gd php-mysql php-curl php-mbstring php-intl \
  php-gmp php-bcmath php-xml php-imagick php-zip php-bz2 \
  unzip wget
```

```sql
CREATE DATABASE nextcloud;
CREATE USER 'nextcloud'@'localhost' IDENTIFIED BY '<enter a password here>';
GRANT ALL PRIVILEGES ON nextcloud.* TO 'nextcloud'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

With that, the database was set up and I could start to install and configure Nextcloud. Now this next part is something I have yet to look into fully,
but I will explain to what I understand and assume using my knowledge of what Nextcloud is and how it interacts with Apache. Since Nextcloud is
simply an application sitting on top of a web sever (like Apache) we simply download and unzip the entire project and put it into the /var/www/ folder,
which is Apache's default folder for storing the web content it will display. By moving the nextcloud/ folder to /var/www/nextcloud/ and changing the configs later,
we are basically telling Apache that this application exists and that requests coming in should interact according to the logic in this folder.

Next, since running Apache, an application with the concept of accepting public web traffic and requests, would be a nightmare to run as `root`, Apache creates a
user and group named www-data upon installation and runs the apache service with those permissions. We want to set the owner and group of `/var/www/nextcloud/` to www-data
so that it runs with the same lowered permissions that Apache does. That explanation was my logic and understanding of the following commands and really
showed me just how easy it is to miss something and misconfigure things, but also makes me appreciate simple installers where I just agree to their terms, set a couple options,
and click install.

```bash
cd /tmp
wget https://download.nextcloud.com/server/releases/latest.zip
unzip latest.zip
mv nextcloud /var/www/
chown -R www-data:www-data /var/www/nextcloud
```

With Nextcloud actually installed, we now needed to configure it so it becomes usable and the first step of that is Apache. Creating and writing a configuration
for a new service running on Apache means creating a \<name\>.conf file in `/etc/apache2/sites-available/` folder. Using `vim`, I wrote the following config into
`/etc/apache2/sites-available/nextcloud.conf` and will again explain as simple as possible to my understanding.

```apache
<VirtualHost *:80>
    DocumentRoot /var/www/nextcloud
    ServerName localhost

    <Directory /var/www/nextcloud/>
        Require all granted
        AllowOverride All
        Options FollowSymLinks MultiViews
    </Directory>
</VirtualHost>
```

We start by specifying that this service is going to be running on port 80 and will be rooted in the `/var/www/nextcloud` folder (which makes sense, we just moved the application there),
Next, we'll specify to Apache to use all the permissions granted to the folder (as Nextcloud will need those permissions to function) and to follow all SymLinks that the Nextcloud app
says to follow.

With that configuration completed, we'll tell Apache to enable Nextcloud and disable the default configs and rewrite modules to allow for the full functionality of Nextcloud:

```bash
a2ensite nextcloud.conf
a2dissite 000-default.conf
a2enmod rewrite headers env dir mime
systemctl restart apache2
```

With that, the final thing we needed to do was to configure php to allow for file uploads that, in other contexts, may slow down an application or be malicious.
These configs are found in `/etc/php/<version>/apache2/php.ini` with \<version\> being the php (or nextcloud, I honestly can't remember which) version that you happened to be installing.
We'll need to find and adjust the following:

```
memory_limit = 512M         // to allow for faster and larger uploads
upload_max_filesize = 16G   // to allow for larger files to be uploaded
post_max_size = 16G         // to allow for large POST requests to be made
max_execution_time = 300    // letting requests take longer to account for large file uploads
```

A simple `systemctl restart apache2` later and our Nextcloud is accessible at `http://<containter-ip>` where we can set up an Admin username and password,
point the Nextcloud database user to the `nextcloud` user/password we made before, set the database Nextcloud should use to `nextcloud`, and set our host to `localhost`.

I now had a decision to make: do I stop here and limit access to Nextcloud to my home internet, making the server act as a backup server that I periodically access, or instead, make the server
accessible from anywhere using another tunnel, Tailscale, or just port forwarding. While it would have been easier to just leave it, I opted to just use another cloudflare tunnel as
I had just did that for proxmox and having my files accessible from everywhere just seemed like a no brainer.

With Nextcloud already running and set up, this should be pretty simple right. To start, I needed to change the Apache configuration to change the `ServerName`
from `localhost` to my desired site (in my case it was just \<subdomain\>.\<domain I used for proxmox\>). Next, add (or replace) the new ServerName to Nextcloud's
`trusted_domains` list. Next, we need to go back to Proxmox's terminal and configure a cloudflare tunnel with a new ingress rule
(basically telling adding the IP of my container to cloudflare's DNS records and properly routing us). This is where the first minor problem arose.
When I was setting up the container, I had the network set to get a dynamic IP from the router, meaning I wouldn't have one single IP that
I could reliably say should point to my Nextcloud. That wasn't too hard of a fix: just give the container a static IP, set the gateway to my router's address, and reboot the container.
Now that I had a static ip, we can configure an ingress rule for cloudflare by adding:

```yaml
- hostname: <subdomain>.<domain>
    service: http://<container-ip>:80
```

and we should have a working site after a quick `cloudflared tunnel route dns homelab subdomain.domain` (to route traffic from subdomain.domain to
this ip in the homelab tunnel group we made earlier) and `systemctl restart cloudflared` we should be up and running. So I go to `https://subdomain.domain` and....

I was met with an error 404. Well that's not good.

To start, I went to the Nextcloud container's static IP and was able to hit the Nextcloud login page just fine. Even using `curl -L` from both the container and proxmox terminal
returned roughly the right html. After a couple minutes of confusion and trying to understand what I did different from the first tunnel I installed, I eventually learned that
edits to `~/.cloudflared/config.yml` don't get copied over to `/etc/cloudflared/config.yml` if the cloudflared service was running (which makes sense but c'mon really). I opened the
config in `/etc` and sure enough, there wasn't my Nextcloud entry, so I added it. Then I saved the file and ran `systemctl restart cloudflared` and...

**Job for cloudflared.service failed because the control process exited with error code.** Well great, now no tunnels are running!

After checking that my syntax in both yaml files were correct, I ran `cloudflared tunnel --config /etc/cloudflared/config.yml run homelab`, telling me that the
the cloudflared service was rejecting my credentials even though they existed in the right spot. After checking my cloudflared dashboard and seeing that my tunnel was down,
I bit the bullet and deleted the tunnel and recreated it with the same name. This honestly wasn't too bad as I just needed to go into `/etc/cloudflared/config.yml` and change
the tunnel id with the new id I got. I also needed to swap tunnel IDs with the existing DNS routes for the Proxmox and Nextcloud which I ended up doing on the cloudflare portal.
From there I tested to see if it was working manually first with `cloudflared tunnel run homelab` and finally started the service again with `systemctl start cloudflared`. Now for
the moment of truth, accessing my Nextcloud's site on my phone and....

Success! Besides from doing some more configuring to turn off skeleton directories, creating users for my family, and basic security configs for the Nextcloud, that was it, I was done.

## The End - Well Sort of

In the end I'm pretty happy with the environment I was able to make.
