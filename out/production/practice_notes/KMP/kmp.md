前置知识：
前缀函数

求前缀函数
public static int[] computePrefixFunction(String str) {
int n = str.length();
int[] pi = new int[n];

    // i 从 1 开始，pi[0] 默认是 0
    for (int i = 1; i < n; i++) {
        int len = pi[i - 1]; // 继承上一轮的最长前后缀长度

        // 不匹配就回退 len
        while (len != 0 && str.charAt(i) != str.charAt(len)) {
            len = pi[len - 1];
        }

        // 匹配成功，长度 +1
        if (str.charAt(i) == str.charAt(len)) {
            len++;
            pi[i] = len;
        }
    }

    return pi;
}