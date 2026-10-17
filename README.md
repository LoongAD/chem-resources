# 化学教学资料站

一个纯静态的教学资料下载站，专为部署到 **GitHub Pages** 设计。
学生打开网址就能按分类浏览、搜索、下载资料，手机电脑都能用。

## 本地预览

```bash
cd chem-resources-site
python3 -m http.server 8000
```

浏览器打开 http://localhost:8000 即可预览。

## 发布到 GitHub Pages（免费）

1. 注册一个 GitHub 账号（github.com）。
2. 新建仓库：点右上角 `+` → `New repository`，仓库名例如 `chem-resources`，
   可见性选 **Public**（公开仓库才能免费用 Pages）。
3. 把本文件夹里的所有文件上传到仓库（网页端 `Add file` → `Upload files`，
   或用 git 命令行 push）。
4. 进仓库的 `Settings` → 左侧 `Pages` → `Build and deployment` 选
   `Deploy from a branch`，分支选 `main`、目录选 `/(root)`，点 `Save`。
5. 等一两分钟，页面顶部会出现网址，形如
   `https://你的用户名.github.io/chem-resources/` —— 发给学生即可。

## 日常维护：添加一份资料

1. 把文件放进 `files/` 下对应的分类文件夹；
2. 打开 `data/resources.js`，在 `RESOURCES` 数组里照示例加一条；
3. 把改动推到 GitHub，网站自动更新，无需其他操作。

分类、网站标题、副标题、老师署名也都在 `data/resources.js` 里改。

## 注意事项

- GitHub Pages 在国内访问速度一般，文件越大越慢；大视频建议放 B 站，
  在 `file` 字段直接填视频链接。
- 不要上传含学生姓名、成绩等隐私信息的文件（仓库是公开的）。
