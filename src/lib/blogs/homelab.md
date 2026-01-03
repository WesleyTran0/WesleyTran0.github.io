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
