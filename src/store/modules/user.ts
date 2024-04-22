import {User } from '@/types/user'
import { defineStore } from 'pinia';
import {store} from '@/store'


export interface UserState {
    token: string;
    accessToken: string;
    refreshToken: string;
    sessionId: string;
    user: User;
}

const user = {
  /**
     * ID
     */
    id: '001',
    /**
     * 用户名
     */
    username: 'amy',
    /**
     * 昵称
     */
    nickname: 'yezi',
    /**
     * 手机号码
     */
    mobile: '12345678',
    /**
     * 电子邮箱
     */
    email: '',
    /**
     * 权限
     */
    authorities: []
}

export const useUserStore = defineStore('user', {
  persist: true,
  state: ():UserState => ({
    token: '',
    accessToken: '',
    refreshToken: '',
    sessionId: '',
    user: user,
  }),
  getters: {
     /**
         * 获取用户名
         */
        username: (state) => state.user?.username,
        /**
         * 获取用户ID
         */
        id: (state) => state.user?.id,
        /**
         * getAccessToken
         */
        getAccessToken: (state) => state.accessToken,
        /**
         * getSessionId
         */
        getSessionId: (state) => state.sessionId,
  },
  actions: {
     setAuthToken(token: string) {
            this.token = token;

        },
        setAccessToken(accessToken: string) {
            this.accessToken = accessToken;
        },
        setRefreshToken(refreshToken: string) {
            this.refreshToken = refreshToken;
        },
        setSessionId(sessionId: string) {
            this.sessionId = sessionId;
        },
  }

})

export const useUserStoreExternal = () => {
    return useUserStore(store);
};
