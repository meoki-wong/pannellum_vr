//引入
import {JSEncrypt} from "jsencrypt";
import {  private_key, publicKey } from "./common_val";
/**
 * 加密
 * @param {String}  需要解密的参数
 */
let test = 'Z1WenFc76NV/hamfsbgOqWzoOtTRT3dgdZRrOjNi/mc62SvrqRsBIPAIGva9Ljg6lXRzuuUPQsjhz/U5+VDwD16TAd9KVLQ5UGZ7Q1266YDkEMsHWftBwuRJBb3845nile7TbFqTy+1ND++594Vyidyt9kvtUXXkHCPKDyXQkQMZjclJhZBXwyVcl9fx3WcjFCsTSgUih79yg+Ks0K15eH7bido9tNdER5HzPfgAzkG/Rkk3WI0L1CqBezgTV5SrUk9GOB66vi1GsELdOI8rEXHmPAL19XxGiTW4Q7ArrGus4ouM4Plsv3e7To0JxqVmPQTpyLfnoGbPQ5IFpgr1HnWIMBq0sVlJUkDgCkeEo4MywvhvN6hZDDPVEiX3C7oB4RnT/KZsrhy8G7StXf/57QwlH0w+f+nLft0BWe1/YBQxQG5IjwpvC3HU9CKp76Y4UeS44xgatgMzORCYbXM50bx9sdqBZxCiTr2Dk6XrzBMuP4HpXBrlc3yceEKBlY7ZExo9rydWv0/+B0nm51U6mwLo5NUvWgsVnTe7XP7/CZFgzMLTH1GzraKIDe/EZl9ef8hToSoOY4Ctj2NxQv6NID1CnWtJJMwkt/15GJs0xUzGwvUlIUijoTDurr0kj6Il6oWbCwJT0TQ6LatQWx0G/BaMtR/qfcq449kOH/2nC54='
export const useDecrypt = () => {
	const privateKey = private_key;
	let encryptor = new JSEncrypt(); // 新建JSEncrypt对象
	console.log('-----encryptor', encryptor);
	encryptor.setPrivateKey(privateKey); // 设置私钥
	let decryptData = encryptor.decryptLong(test); // 对内容进行解密
	console.log('00000解密测试', decryptData);
	return decryptData;
};

export const useEncrypt = () => {
	const encrypt = new JSEncrypt();
	encrypt.setPublicKey(publicKey);
	const encrypted = encrypt.encrypt(encodeURIComponent({"oAInfo":{"provName":"总部","cityName":"","city":"000","loginToken":"d6hrzuqjIVAI9RGyi%2Bdl9kZY7zGAhgWFnVuODtJLVeKbdK4p2Yo%2F5QSU9VChVQubxx1X7VOR6f8IhK%2BqkHgpbvPVNpSxIwAXq1olmX4UFt9F2epy0PXZ3iOIKc19dL6SYmSgkPQm0eAeVY1nV%2F5%2BN8U6Ib6rtaqy%2Bl7DRhclwJs%3D","user":{"deptName":"广州软件研究院-项目管理部","orgName":"联通软件研究院","role":"","org3Name":"广州软件研究院","deptId":47667,"org2Name":"广州软件研究院","login":"yanjy23","orgId":50,"number":"0930418","orgType":2,"org3Id":453,"phone":"18620021063","org2Id":453,"businessLine":"0","name":"闫晶莹","id":1000000589,"email":"yanjy23@chinaunicom.cn","status":"0"},"prov":"99"},"RESP_CODE":"0000","appid":"test","sessionId":"151687945518495"}));
	return encrypted

	// let encryptor = new JSEncrypt()
 
    // encryptor.setPublicKey(key)
 
    // let cptData = encryptor.encryptLong(data)
 
    // return cptData

}


// 解密
// const decrypt = new JSEncrypt();
// decrypt.setPrivateKey(privateKey);
// const decrypted = decrypt.decrypt(encrypted);
