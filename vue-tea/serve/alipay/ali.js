const AlipaySdk = require('alipay-sdk').default
// TypeScript，可以使用 import AlipaySdk from 'alipay-sdk';
// 普通公钥模式
const alipaySdk = new AlipaySdk({
  //appId
  appId: '2021000122674457',
  // keyType: 'PKCS1', // 默认值。
  //签名算法
  signType: 'RSA2',
  //支付宝网关
  gateway: 'https://openapi-sandbox.dl.alipaydev.com/gateway.do',

  //应用私钥
  privateKey:
    'MIIEogIBAAKCAQEAk0jWCG044Jxl00pG2wRHOAUAuzkeEGE6F9jypOneFNxVbWc634XIlM9CEC3JvIhZc7WUMAx1BV6h6yxoy4WHGsFo6Bo++YxYSSik6VVPtedlBA2rnqrIInsl32qwGlvvmlgpwZaFh69ERFnALdn+q+nuvtt523k2H87bQvIvqn+I7Ld7AzZJK8Ouba8I7/Jbrrh5QU7SOxHuseQr4ni9esc5GzgvrmYLlFCnzJPqh/P57m6342d8lf1AN14epNb/P3SvFMrRkXsUEfa2o5TCKz2px88zchENJcEEeE0xjDihFMGbykJaF0KgSs6ZSFUN1qigKZ6Pj35YFwE0jstfdwIDAQABAoIBADIL1NaGLoZ7/kmeepcfTAfoA0ia7vFH6FKEIGcTJKhX+hszsZiUQAT4rA0NUfhjKGod8B2njffmIQTlUTKey7q2r6v2hyGKo9EwI2E54N0BpJyM/JzskRbOW58gBHjgdnkurfme6P6i+oJzMM8jvNqzobFuqGiANnj2dCC6ZKH9LjG345AN+FtOWKvvD13rJaGG0s327F/mLNlW9CJRFRXrkp660UKDnnsHH2ie9vMvrruEiOh8NMExlchieibWi7VuxftiotUafsyJR4CMjLlAJ1OqxHLZuB7zzbePkmfmkiiknP0fWk68geF/lfe0DIlqcDr56Fj+Y3R2vmR1u7kCgYEA92th4co0Fi5qX3K1m1T7rbrzZd60wBAdK1WXHDZzCKDnMKLZ4flEpCXYPzMT9Tz7yZiCpRPF8FWxbj/v/XJR9PIeA7QE++K2rNx1rLku9AtIfPWA+ZB5UAaNlBm5WS9YOWS0/fqS6HixReILA2c9v73qZp+4PYvg1DLd5OzGGfMCgYEAmGRxyHK2HYA1f9WU4eWoS3iwyCXH2tcuDLKl8+sBWz3EHXVCbSUOFGPRfAq9nXaTyREJR4fTs4cYS9hpWk4LSx2dKx4XDM7cFev8zVWv+RNQUZNdbwfcPhjYOTs8cWal9a5uVcI1VJpcyYoBJtCj7jF+amcN6H7LvBKlzTL+IW0CgYAx7n/ge1grqc5Z2OKBqJLqKrJ4OourvxTD7BAE55Ari51cmWDzU8Tgg6qyhnJeqaH+u0KSYf0uVXzrTQf31BxqHHqmMKxY0RYgqJUu+GhbY/OLFFilBN0Wo1vrKY3YS8+4NXS5VNpVBBZyjf2/ABTcH02wzEb4VMRYzrMtQgNwtQKBgANrDVpPqGIVBB4v7jz658F5nY1/u3HfLbs/LpXACbHAOuvmO20zTZOLgaFkpEgp5rq11R1zoH4AY70fx40s/vfaXDIhZKb25NzhBDSe3Wma00xhH9Fjvb7u07rE52Ary0EtfnASARw6siYbIFd8ipDHL2y3jwpN/cfkKy/lGuopAoGATWbTp2VAW9xWL4/4ErhGgLHc5i54MUIohKOiVPHpPglgJO+TDOGb6/KcYba2Vtrd/zgm86l+fFhZKZiVl+dBMg4t4cgbu8jnDIh7sla9iplhZFrVCw9TndyN7rPrZ1Iv6ksQ+mXapRu5qbqvPN+cQzplpfYgLJ7/bcLFRBzGdSg=',

  //支付宝公钥
  alipayPublicKey:
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxbjnJQ5gz3JB1WAZuKTIZm6ZCMxtDgkoDZ/SepL7Wa3LrHLcQqNJV1+M8m8xhr2R3al1Dss4cug6melLB5weFHjajfeSgt7/EUw9f/05njCJ/T6MGXHD39WG/UhjK8mdu2cBJ+SdZaWZJopqqha7hmiAYd+9Nl6RDNdqMkvPsU2ZDTDwbMFx6F6C+RrPpb6OAQPXCNqaQzVAfWlQXPNYs7PcRQSTZUSNDdjEPWWhKOOSkE0hpvvT2WjnALhadfgUO8kCAASI7gnhRiGJtMy/oH+AFK7wQ+bC/K5q13xdYBMyAEgtlwlzs8TfK5QiNHuwcouAGnpKK5beXegDJoCCQwIDAQAB'
})
module.exports = alipaySdk
