# AntMiner API

BitMain's new Antminer series offers hashing speeds and IP administrator access. The Antminer panel is built-in Perl website with pages located in `/cgi-bin/`. It is possible to gain SSH access to the system and examine the web site files.
 - Antminer is located at http://192.168.1.150/
 - `ssh root@192.168.1.100`
 - Password: `root`
 - `cd /www/pages/cgi-bin;` `ls`

# API Access

  - Import a HTML file and watch it magically convert to Markdown
  - Drag and drop images (requires your Dropbox account be linked)

# System Commands

- `reboot.cgi` - *Reboots entire system (careful)*
- `passwd.cgi` - *Resets website root password to **''***
- `monitor.cgi` - *Unix system **'top'** process list output* 

# Shutdown Commands
- `kill_cgminer.cgi` - *Shutdown cgMiner*
- `kill_bmminer.cgi` - 
- `kill_bmminer2.cgi` 
- `kill_cgminer.cgi`

You can also:
  - SSH into the device with the root user
  - Use `wget` to download files from the web


