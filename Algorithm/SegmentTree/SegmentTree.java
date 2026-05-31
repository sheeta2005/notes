package SegmentTree;

class SegmentTree {
    int[] tree;  // 线段树数组
    int n;       // 原数组长度

    // 构造函数：初始化
    public SegmentTree(int size) {
        n = 1;
        while (n < size) n <<= 1; // 变成2的幂
        tree = new int[2 * n];    // 开 2*n 空间
    }

    // 单点更新：把位置 pos 的值改成 val
    public void update(int pos, int val) {
        pos += n;         // 跳到叶子节点
        tree[pos] = val;  // 更新值

        // 向上更新父节点
        for (pos >>= 1; pos >= 1; pos >>= 1) {
            tree[pos] = Math.max(tree[2*pos], tree[2*pos+1]);
        }
    }

    // 查询区间 [l, r] 的最大值
    public int query(int l, int r) {
        l += n;
        r += n;
        int max = 0;

        while (l <= r) {
            if ((l & 1) == 1) max = Math.max(max, tree[l++]);
            if ((r & 1) == 0) max = Math.max(max, tree[r--]);
            l >>= 1;
            r >>= 1;
        }
        return max;
    }
}