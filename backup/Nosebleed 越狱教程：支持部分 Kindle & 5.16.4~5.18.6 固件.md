**警告**！越狱操作具有一定风险，请务必谨慎处理。建议在操作前充分了解相关知识及可能产生的影响。本网站仅提供信息参考，用户因自行操作所导致的任何后果，本网站不承担任何责任，相关风险由用户自行评估与承担。

Nosebleed 是由网友 hhhhhhhhh 于 2026 年 3 月 2 日发布的越狱方法（[官方页面](https://kindlemodding.org/jailbreaking/Nosebleed/)）。该越狱方法仅支持固件版本为 5.16.4~5.18.6 的 Kindle Paperwhite 5（含 Signature 版）、Kindle 11 和 Kindle Oasis 3 这三款设备。官方页面称该越狱方法未在 Kindle Oasis 3 上测试，但[不少网友反馈可用](https://www.reddit.com/r/kindlejailbreak/comments/1rj3nfl/new_jailbreak_5186_nosebleed_jailbreak_for/)。

作者 hhhhhhhhh 在 MobileRead 论坛上[发帖](https://www.mobileread.com/forums/showthread.php?t=372352)称，该越狱方法利用了编号为 [CVE-2020-16040](https://nvd.nist.gov/vuln/detail/CVE-2020-16040) 的漏洞。对于版本小于 5.19.2 的固件，亚马逊为提高旧版本 Chromium 的安全性，错误地使用命令行选项禁用了即时编译（[JIT](https://en.wikipedia.org/wiki/Just-in-time_compilation)）。并且 Kindle Paperwhite 5 和 Kindle 11 均未启用 Chromium 沙盒，使得越狱更加方便。而对于其他大多数 Kindle，除非突破沙盒，否则越狱是不可行的。

## 一、必要条件

此越狱方法仅支持固件版本为 **5.16.4** ~ **5.18.6** 的以下设备型号（支持无序列号设备）。

* **Kindle Paperwhite 5** (KPW5, PW5)
* **Kindle Paperwhite 5 Signature Edition** (KPW5SE)
* **Kindle 11** (KT5, K11)
* **Kindle Oasis 3** (KOA3, KO3)

以下步骤需要一台计算机和一条可向 Kindle 传输数据的数据线。

## 二、下载文件

越狱步骤所需的文件都在下面这个 nosebleed.zip 文件中，请下载后解压备用。

* **下载 nosebleed.zip**：[直链下载](blob:https://bookfere.com/785495c9-76f5-4b95-9352-f2ed8621237c) ｜ [百度网盘](https://pan.baidu.com/s/1WqhCTeVik-kRMiM0R-NGkA?pwd=6666)

## 三、操作步骤

1. 开启 Kindle 的飞行模式，以防止自动升级固件；
2. 用 USB 数据线将 Kindle 连接至电脑直至出现 Kindle 磁盘；
3. 将解压 [nosebleed.zip](blob:https://bookfere.com/785495c9-76f5-4b95-9352-f2ed8621237c) 得到的三个文件 **jb**、**jb.sh**、**patchedUks.sqsh** 拷贝到 Kindle 根目录（与 documents 文件夹同级）；
4. 弹出磁盘回到 Kindle 界面，通过右上角的菜单打开 Kindle 的网页浏览器；
5. 在地址栏中输入网址 **https://kindlemodding.org/nosb** 并按回车；
6. 点击图片中 Jeff Bezos（杰夫·贝索斯）额头上的字母 **L** 即可完成越狱（出现 Application Errors 警告框是正常的，请忽略）。

## 四、安装补丁

安装热修复补丁可以防止越狱在更新固件后失效。不过，需要注意的是，安装补丁并不意味着一劳永逸，因为补丁的有效性通常落后于亚马逊固件的更新，也就是说，新固件随时可能破坏补丁的作用。因此，为防止越狱失效，最好不要依赖补丁，而是[禁止 Kindle 自动更新](https://bookfere.com/post/472.html)。

**下载 Hotfix**：[官方页面](https://github.com/KindleModding/Hotfix/releases/latest)

热修复补丁的具体安装步骤如下：

1. 用 USB 数据线将你的 Kindle 连接到电脑；
2. 将下载到的 **.bin** 文件拷贝到 Kindle 根目录；
3. 弹出 Kindle 磁盘并断开 USB 数据线连接；
4. 前往【设置 → 更新您的 Kindle】安装补丁；
5. 等待 Kindle 自动重新启动；
6. 进入 Kindle 后点击名为“**Run Hotfix**”的电子书。

注意，每次更新 Kindle 固件后都需要重新点击名为“Run Hotfix”的电子书。

## 五、安装插件

从 **5.16.3** 版本固件开始，Kindle 系统的 **EABI**（嵌入式应用程序二进制接口）由原来的 armel（ARM EABI, Little-endian）换成了 armhf（ARM hard float），因此需要选择[支持 HF（hard float）的插件](https://fw.notmarek.com/khf/)。目前只有少量的插件支持 HF（比如 MRPI 和 KOReader，可以在[这个页面](https://fw.notmarek.com/khf/)找到），如果你想要安装其他[不支持 HF 的插件](https://bookfere.com/post/311.html)，必须先将 [Kindle 固件降级](https://bookfere.com/post/979.html)到 5.16.3 之前的版本。

如果你在操作的过程中发现本文存在纰漏，欢迎留言纠正，也欢迎分享你的经验给其他小伙伴。

© 「[书伴](https://bookfere.com/)」原创文章，转载请注明出处及原文链接：[https://bookfere.com/post/1179.html](https://bookfere.com/post/1179.html)