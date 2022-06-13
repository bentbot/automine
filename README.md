_This project is nothing noteworthy right now other than this readme file below..._

# AntMiner API

BitMain's new Antminer series offers hashing speeds and IP administrator access. The Antminer panel is built-in Perl website with pages located in `/cgi-bin/`. It is possible to gain SSH access to the system and examine the web site files.
 - Antminer is located at http://192.168.1.150/
 - `ssh root@192.168.1.100`
 - Password: `root`
 - `cd /www/pages/cgi-bin;` `ls`

# API Access

  - Import a HTML file and watch it magically convert to Markdown
  - Drag and drop images (requires your Dropbox account be linked)

# Useful Information 
 - `get_miner_conf.cgi` - Return the current settings of the miner ( Miner Config page )
 - `get_miner_status.cgi` - Return the current status of the miner ( Miner Status page )


 - `get_kernel_log.cgi`
 - `get_miner_conf.cgi`
 - `get_miner_status.cgi`
 - `get_network_info.cgi`
 - `get_system_info.cgi`

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



Full list of ASIC Control Panel pages:

cgi_lib.cgi             kill_bmminer2.cgi       passwd.cgi
create_conf_backup.cgi  kill_cgminer.cgi        reboot.cgi
get_kernel_log.cgi      minerAdvanced.cgi       reset_conf.cgi
get_miner_conf.cgi      minerConfiguration.cgi  set_miner_conf.cgi
get_miner_status.cgi    minerStatus.cgi         set_network_conf.cgi
get_network_info.cgi    miner_lcd.sh            upgrade.cgi
get_system_info.cgi     monitor.cgi             upgrade_clear.cgi
kill_bmminer.cgi        network_diag.cgi        upload_conf.cgi
