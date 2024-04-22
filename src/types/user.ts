export interface User{
  /**
     * ID
     */
    id: string;
    /**
     * 用户名
     */
    username: string;
    /**
     * 昵称
     */
    nickname: string;
    /**
     * 手机号码
     */
    mobile: string;
    /**
     * 电子邮箱
     */
    email: string;
    /**
     * 角色
     */
    roles?: string[];
    /**
     * 角色
     */
    roleTypes?: number[];
    /**
     * 权限
     */
    authorities: string[] | Array<string>;
}
