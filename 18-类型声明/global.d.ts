/* ----------------------- 使用module为一个没有类型声明的模块添加类型声明 ----------------------- */
declare module 'pkg' {
  export const handler: () => boolean

  const pkg: () => void

  export default pkg
}
/* ----------------------- 使用module为一个没有类型声明的模块添加类型声明 ----------------------- */

/* ------------------------------- 为md文件添加类型声明 ------------------------------ */
declare module '*.md' {
  const content: string
  export default content
}
/* ------------------------------- 为md文件添加类型声明 ------------------------------ */
