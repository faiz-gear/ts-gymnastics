/// <reference path="./other.d.ts" />
///  <reference types="node" />
/// <reference lib="dom" />

//三斜线指令必须被放置在文件的顶部才能生效。

// path的reference指令是相对于当前文件的路径，而types的reference指令是相对于node_modules/@types目录的路径, lib导入的是typescript内置的声明文件(如lib.dom.d.ts)。
