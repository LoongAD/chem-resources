/* ============================================================
化学教学资料站 — 资料清单
这是全站唯一需要你手动维护的文件：
1. 把资料文件放进 files/ 下对应的文件夹；
2. 在下面的 RESOURCES 里加一条（照着示例抄）；
3. 分类、标题、副标题都在这里改，页面会自动更新。
============================================================ */

/* ---- 网站信息：改成你自己的 ---- */
const SITE = {
title: '化学教学资料站',
subtitle: '初三化学 · 鲁教版',
teacher: '龙老师'
};

/* ---- 分类：增、删、改这里，页面标签会自动跟着变 ---- */
const CATEGORIES = ['课件', '试卷', '实验视频', '讲义'];

/* ---- 资料列表 ----
每条资料包含：
title 标题（必填）
category 分类（必填，必须是上面 CATEGORIES 里的一种）
desc 一句话简介（选填）
file 文件路径（必填，相对于网站根目录，如 files/课件/xxx.pptx）
format 文件类型徽标，如 PPTX / PDF / MP4（选填）
date 更新日期（选填）
*/
const RESOURCES = [
{
title: '第一单元综合素质评价',
category: '试卷',
desc: '覆盖物理变化与化学变化、实验基本操作，多选自中考真题。',
file: 'files/试卷/第一单元综合素质评价.doc',
format: 'DOC',
date: '2026-10-17'
},
{
title: '第二单元综合素质评价',
category: '试卷',
desc: '覆盖微粒的构成、元素及元素周期表，多选自中考真题。',
file: 'files/试卷/第二单元综合素质评价.doc',
format: 'DOC',
date: '2026-10-17'
},
{
title: '第三单元综合素质评价',
category: '试卷',
desc: '覆盖溶液的形成、配制与溶解度，多选自中考真题。',
file: 'files/试卷/第三单元综合素质评价.doc',
format: 'DOC',
date: '2026-10-17'
},
{
title: '第四单元综合素质评价',
category: '试卷',
desc: '覆盖空气的成分、氧气的性质与制取，多选自中考真题。',
file: 'files/试卷/第四单元综合素质评价.doc',
format: 'DOC',
date: '2026-10-17'
},
{
title: '第五单元综合素质评价',
category: '试卷',
desc: '定量研究化学反应：质量守恒定律、化学方程式的书写与计算。',
file: 'files/试卷/第五单元综合素质评价.doc',
format: 'DOC',
date: '2026-10-17'
},
{
title: '第五单元 定量研究化学反应（原卷版）',
category: '试卷',
desc: '单元测试卷·原卷，可直接打印给学生做。',
file: 'files/试卷/第五单元 定量研究化学反应（原卷版）.docx',
format: 'DOCX',
date: '2026-10-17'
},
{
title: '第五单元 定量研究化学反应（解析版）',
category: '试卷',
desc: '单元测试卷·解析版，含答案与解析。',
file: 'files/试卷/第五单元 定量研究化学反应（解析版）.docx',
format: 'DOCX',
date: '2026-10-17'
},
{
title: '第五单元所有题型',
category: '试卷',
desc: '第五单元题型归纳汇总，复习备查。',
file: 'files/试卷/第五单元所有题型.docx',
format: 'DOCX',
date: '2026-10-17'
},
{
title: '第六单元综合素质评价',
category: '试卷',
desc: '控制燃烧：燃烧的条件、灭火原理、化石燃料与新能源。',
file: 'files/试卷/第六单元综合素质评价.doc',
format: 'DOC',
date: '2026-10-17'
},
{
title: '第六单元 控制燃烧（原卷版）',
category: '试卷',
desc: '单元测试卷·原卷，可直接打印给学生做。',
file: 'files/试卷/第六单元 控制燃烧（原卷版）.docx',
format: 'DOCX',
date: '2026-10-17'
},
{
title: '第六单元 控制燃烧（解析版）',
category: '试卷',
desc: '单元测试卷·解析版，含答案与解析。',
file: 'files/试卷/第六单元 控制燃烧（解析版）.docx',
format: 'DOCX',
date: '2026-10-17'
},
{
title: '第七单元综合素质评价',
category: '试卷',
desc: '认识酸和碱：酸碱的性质、pH、中和反应。',
file: 'files/试卷/第七单元综合素质评价.doc',
format: 'DOC',
date: '2026-10-17'
},
{
title: '第七单元 认识酸和碱（原卷版）',
category: '试卷',
desc: '单元测试卷·原卷，可直接打印给学生做。',
file: 'files/试卷/第七单元 认识酸和碱（原卷版）.docx',
format: 'DOCX',
date: '2026-10-17'
},
{
title: '第七单元 认识酸和碱（解析版）',
category: '试卷',
desc: '单元测试卷·解析版，含答案与解析。',
file: 'files/试卷/第七单元 认识酸和碱（解析版）.docx',
format: 'DOCX',
date: '2026-10-17'
},
{
title: '第八单元综合素质评价',
category: '试卷',
desc: '海洋化学资源的利用：海水晒盐、氯碱工业等。',
file: 'files/试卷/第八单元综合素质评价.doc',
format: 'DOC',
date: '2026-10-17'
},
{
title: '第八单元 海洋化学资源的利用（原卷版）',
category: '试卷',
desc: '单元测试卷·原卷，可直接打印给学生做。',
file: 'files/试卷/第八单元 海洋化学资料的利用（原卷版）.docx',
format: 'DOCX',
date: '2026-10-17'
},
{
title: '第八单元 海洋化学资源的利用（解析版）',
category: '试卷',
desc: '单元测试卷·解析版，含答案与解析。',
file: 'files/试卷/第八单元 海洋化学资料的利用（解析版）.docx',
format: 'DOCX',
date: '2026-10-17'
},
{
title: '第九单元综合素质评价',
category: '试卷',
desc: '金属：金属的性质、冶炼、防护与金属材料。',
file: 'files/试卷/第九单元综合素质评价.doc',
format: 'DOC',
date: '2026-10-17'
},
{
title: '第九单元 金属（原卷版）',
category: '试卷',
desc: '单元测试卷·原卷，可直接打印给学生做。',
file: 'files/试卷/第九单元 金属（原卷版）.docx',
format: 'DOCX',
date: '2026-10-17'
},
{
title: '第九单元 金属（解析版）',
category: '试卷',
desc: '单元测试卷·解析版，含答案与解析。',
file: 'files/试卷/第九单元 金属（解析版）.docx',
format: 'DOCX',
date: '2026-10-17'
},
{
title: '第十单元综合素质评价',
category: '试卷',
desc: '化学与健康：营养素、化学元素与人体健康。',
file: 'files/试卷/第十单元综合素质评价.doc',
format: 'DOC',
date: '2026-10-17'
},
{
title: '第十单元 化学与健康（原卷版）',
category: '试卷',
desc: '单元测试卷·原卷，可直接打印给学生做。',
file: 'files/试卷/第十单元 化学与健康（原卷版）.docx',
format: 'DOCX',
date: '2026-10-17'
},
{
title: '第十单元 化学与健康（解析版）',
category: '试卷',
desc: '单元测试卷·解析版，含答案与解析。',
file: 'files/试卷/第十单元 化学与健康（解析版）.docx',
format: 'DOCX',
date: '2026-10-17'
},
{
title: '第十一单元综合素质评价',
category: '试卷',
desc: '化学与社会发展：化学与环境、材料、能源。',
file: 'files/试卷/第十一单元综合素质评价.doc',
format: 'DOC',
date: '2026-10-17'
},
{
title: '第十一单元 化学与社会发展（原卷版）',
category: '试卷',
desc: '单元测试卷·原卷，可直接打印给学生做。',
file: 'files/试卷/第十一单元 化学与社会发展（原卷版）.docx',
format: 'DOCX',
date: '2026-10-17'
},
{
title: '第十一单元 化学与社会发展（解析版）',
category: '试卷',
desc: '单元测试卷·解析版，含答案与解析。',
file: 'files/试卷/第十一单元 化学与社会发展（解析版）.docx',
format: 'DOCX',
date: '2026-10-17'
},
{
title: '期中化学试题（扫描版）',
category: '试卷',
desc: '期中考试化学试题，图片扫描版。',
file: 'files/试卷/期中化学试题（扫描版）.docx',
format: 'DOCX',
date: '2026-10-17'
},
{
title: '滕州市2024-2025学年九年级上学期11月期中考试化学试题',
category: '试卷',
desc: '山东省枣庄市滕州市期中真题。',
file: 'files/试卷/山东省枣庄市滕州市2024-2025学年九年级上学期11月期中考试化学试题.docx',
format: 'DOCX',
date: '2026-10-17'
},
{
title: '期末化学综合测试',
category: '试卷',
desc: '期末综合测试卷，含选择题与非选择题。',
file: 'files/试卷/期末化学综合测试.docx',
format: 'DOCX',
date: '2026-10-17'
},
{
title: '期末综合素质评价',
category: '试卷',
desc: '期末综合素质评价卷。',
file: 'files/试卷/期末综合素质评价.doc',
format: 'DOC',
date: '2026-10-17'
},
{
title: '期末综合能力素质评价',
category: '试卷',
desc: '期末综合能力素质评价卷。',
file: 'files/试卷/期末综合能力素质评价.doc',
format: 'DOC',
date: '2026-10-17'
},
{
title: '期末化学模拟试卷',
category: '试卷',
desc: '期末化学模拟试卷。',
file: 'files/试卷/期末化学模拟试卷.docx',
format: 'DOCX',
date: '2026-10-17'
},
{
title: '期末综合测试卷B（1~7单元）（原卷版）',
category: '试卷',
desc: '覆盖1~7单元的期末综合测试·原卷。',
file: 'files/试卷/期末综合测试卷B（1~7单元）（原卷版）.docx',
format: 'DOCX',
date: '2026-10-17'
},
{
title: '期末综合测试卷B（1~7单元）（解析版）',
category: '试卷',
desc: '覆盖1~7单元的期末综合测试·解析版。',
file: 'files/试卷/期末综合测试卷B（1~7单元）（解析版）.docx',
format: 'DOCX',
date: '2026-10-17'
},
{
title: '金乡县2024-2025学年九年级上学期期末模拟测试化学卷',
category: '试卷',
desc: '山东省济宁市金乡县期末模拟真题。',
file: 'files/试卷/山东省济宁市金乡县2024-2025化学期末测试卷.docx',
format: 'DOCX',
date: '2026-10-17'
},
{
title: '金乡县期末化学模拟测试卷答案',
category: '试卷',
desc: '金乡县期末模拟测试卷配套答案。',
file: 'files/试卷/金乡县期末化学模拟测试卷答案.docx',
format: 'DOCX',
date: '2026-10-17'
},
{
title: '高唐县2024-2025学年九年级上学期期末学业水平检测化学试卷',
category: '试卷',
desc: '山东省聊城市高唐县期末学业水平检测真题（PDF）。',
file: 'files/试卷/高唐县期末学业水平检测化学试卷.pdf',
format: 'PDF',
date: '2026-10-17'
},
{
title: '高唐县期末学业水平检测化学试卷答案',
category: '试卷',
desc: '高唐县期末学业水平检测配套答案（PDF）。',
file: 'files/试卷/高唐县期末学业水平检测化学试卷答案.pdf',
format: 'PDF',
date: '2026-10-17'
}
];
