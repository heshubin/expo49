import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
class HttpClient {
    // constructor() {
    //     (async () => {
    //         await this.init();
    //     })()
    // }

    static async create() {
        const instance = new HttpClient();
        await instance.init();
        return instance;
    }

    async init() {
        let _defaultUser = {
            "userName": "default",
            "userToken": 'eyJhdXRoIjoiZThjYzBiMGQ5YTkxMmE1MTc2ZmIyZjVhMmM0NjhkNjAiLCJkYXRhIjoiMzAxNTM1MyIsIm5vbmNlIjoiMjI4NiIsInQiOjIsInRzIjoxNjg2MzIyNTAxLCJ2IjoxfQ=='
        };
        let _user = await AsyncStorage.getItem('user');
        if (_user) {
            _defaultUser = JSON.parse(_user);
        }

        this.headers = {
            'Content-Type': 'application/json',
            'token': decodeURIComponent(_defaultUser.userToken),
        }
    }
    /**
     * 设置本次请求的header信息
     * @param {*} headers {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
     * @returns 
     */
    setHeaders(headers) {
        this.headers = Object.assign({}, this.headers, headers);
        return this;
    }

    async get(url) {

        return await this.request(url, {
            method: 'GET',
        })
    }

    async post(url, data) {
        return await this.request(url, {
            method: 'POST',
            body: JSON.stringify(data)
        })
    }

    async put(url, data) {
        return await this.request(url, {
            method: 'PUT',
            body: JSON.stringify(data)
        })
    }

    async delete(url) {
        return await this.request(url, {
            method: 'DELETE'
        })
    }

    async errorHandle(response) {
        if (response.status === 503) {
            throw new Error('服务器维护中，请稍后再试');
        }

    }

    /**
     * 私有方法，禁止外部调用
     * @param {*} url 
     * @param {*} options 
     * @returns 
     */
    async request(url,
        options = {
            method: 'GET',
        }) {
        const startTime = Date.now();

        try {
            const response = await fetch(url, {
                headers: this.headers,
                ...options
            });
            const endTime = Date.now();
            const elapsedTime = endTime - startTime;
            console.log(`接口 ${url} 的耗时：${elapsedTime} 毫秒`);

            await this.errorHandle(response);
            return await response.json();

        } catch (error) {
            console.error(`请求接口 ${url} 时出错：`, error);
            throw error;
        }

       
    }
}

export default HttpClient;