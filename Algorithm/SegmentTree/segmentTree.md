# 线段树学习笔记
## 一、核心概念
线段树是一种基于**分治思想**的二叉树结构，用于高效解决**区间查询、单点/区间更新**问题，核心优势是所有操作的时间复杂度均为 **O(log n)**，适合处理大数据量场景。

### 1.1 结构定义
- 每个节点代表一段连续的数组区间 `[l, r]`
- 根节点：代表整个数组区间 `[1, n]`
- 叶子节点：代表单个元素区间 `[i, i]`
- 内部节点：将区间二分，左孩子 `[l, mid]`、右孩子 `[mid+1, r]`，合并左右结果得到当前节点值

### 1.2 关键性质
- 节点编号规则：父节点 `i` 的左孩子为 `2*i`，右孩子为 `2*i+1`；子节点 `i` 的父节点为 `⌊i/2⌋`
- 空间复杂度：需开 `4*n` 大小的数组存储，保证足够空间
- 可维护信息：区间和、最大值、最小值、GCD 等满足结合律的信息

---

## 二、基础操作（Java实现）
### 2.1 基础模板（区间最大值 + 单点更新）
```java
class SegmentTree {
    int[] tree;
    int n;

    // 构造函数：初始化线段树
    public SegmentTree(int size) {
        n = size;
        tree = new int[4 * n];
    }

    // 构建线段树（递归实现）
    public void build(int[] arr) {
        build(0, 1, n, arr);
    }

    private void build(int node, int l, int r, int[] arr) {
        if (l == r) {
            tree[node] = arr[l - 1];
            return;
        }
        int mid = (l + r) / 2;
        build(2 * node + 1, l, mid, arr);
        build(2 * node + 2, mid + 1, r, arr);
        tree[node] = Math.max(tree[2 * node + 1], tree[2 * node + 2]);
    }

    // 单点更新：将pos位置的值修改为val
    public void update(int pos, int val) {
        update(0, 1, n, pos, val);
    }

    private void update(int node, int l, int r, int pos, int val) {
        if (l == r) {
            tree[node] = val;
            return;
        }
        int mid = (l + r) / 2;
        if (pos <= mid) {
            update(2 * node + 1, l, mid, pos, val);
        } else {
            update(2 * node + 2, mid + 1, r, pos, val);
        }
        tree[node] = Math.max(tree[2 * node + 1], tree[2 * node + 2]);
    }

    // 区间查询：查询[l, r]的最大值
    public int query(int l, int r) {
        return query(0, 1, n, l, r);
    }

    private int query(int node, int nodeL, int nodeR, int l, int r) {
        if (r < nodeL || nodeR < l) {
            return Integer.MIN_VALUE;
        }
        if (l <= nodeL && nodeR <= r) {
            return tree[node];
        }
        int mid = (nodeL + nodeR) / 2;
        int leftMax = query(2 * node + 1, nodeL, mid, l, r);
        int rightMax = query(2 * node + 2, mid + 1, nodeR, l, r);
        return Math.max(leftMax, rightMax);
    }
}
```

### 2.2 操作解析
1. **build 构建**：自底向上递归划分区间，合并左右子树的信息
2. **update 单点更新**：找到对应叶子节点修改值，向上更新所有父节点
3. **query 区间查询**：将目标区间拆分为多个线段树节点区间，合并结果

---

## 三、进阶操作：区间更新（懒标记 Lazy Tag）
### 3.1 核心思想
对于区间更新操作，为避免重复修改所有受影响节点，使用**懒标记**延迟更新操作，仅在需要访问子节点时才将标记下传。

### 3.2 区间加法更新模板
```java
class SegmentTreeLazy {
    int[] tree;
    int[] lazy;
    int n;

    public SegmentTreeLazy(int size) {
        n = size;
        tree = new int[4 * n];
        lazy = new int[4 * n];
    }

    // 下传懒标记
    private void pushDown(int node, int l, int r) {
        if (lazy[node] == 0) return;
        int mid = (l + r) / 2;
        int left = 2 * node + 1;
        int right = 2 * node + 2;

        // 更新左孩子
        tree[left] += lazy[node] * (mid - l + 1);
        lazy[left] += lazy[node];
        // 更新右孩子
        tree[right] += lazy[node] * (r - mid);
        lazy[right] += lazy[node];
        // 清除当前节点标记
        lazy[node] = 0;
    }

    // 区间加法更新：[ul, ur] 区间每个元素加val
    public void rangeUpdate(int ul, int ur, int val) {
        rangeUpdate(0, 1, n, ul, ur, val);
    }

    private void rangeUpdate(int node, int l, int r, int ul, int ur, int val) {
        if (ur < l || r < ul) return;
        if (ul <= l && r <= ur) {
            tree[node] += val * (r - l + 1);
            lazy[node] += val;
            return;
        }
        pushDown(node, l, r);
        int mid = (l + r) / 2;
        rangeUpdate(2 * node + 1, l, mid, ul, ur, val);
        rangeUpdate(2 * node + 2, mid + 1, r, ul, ur, val);
        tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
    }

    // 区间查询（和）
    public int rangeQuery(int ql, int qr) {
        return rangeQuery(0, 1, n, ql, qr);
    }

    private int rangeQuery(int node, int l, int r, int ql, int qr) {
        if (qr < l || r < ql) return 0;
        if (ql <= l && r <= qr) return tree[node];
        pushDown(node, l, r);
        int mid = (l + r) / 2;
        return rangeQuery(2 * node + 1, l, mid, ql, qr) + rangeQuery(2 * node + 2, mid + 1, r, ql, qr);
    }
}
```

---

## 四、常见应用场景
1. **区间最值查询**：如题目中维护空白区间最大值，判断是否可放置物块
2. **区间和/前缀和查询**：统计区间元素和、快速计算前缀和
3. **区间更新+查询**：如批量加法、乘法、赋值操作，结合懒标记实现
4. **动态数据维护**：如频繁修改元素并查询区间信息的场景（如动态规划、图论）

---

## 五、时间与空间复杂度
| 操作         | 时间复杂度 | 空间复杂度 |
|--------------|------------|------------|
| 构建（build）| O(n)       | O(4*n)     |
| 单点更新     | O(log n)   | O(4*n)     |
| 区间查询     | O(log n)   | O(4*n)     |
| 区间更新（懒标记）| O(log n) | O(4*n)     |

---

## 六、易错点与注意事项
1. **数组下标**：线段树节点编号从0或1开始需统一，避免越界
2. **懒标记下传时机**：必须在访问子节点前（更新/查询）下传标记，否则结果错误
3. **合并操作**：需保证合并逻辑正确（如最大值、和、GCD的合并规则）
4. **边界条件**：区间划分时需注意 `mid` 的计算，避免区间重叠或遗漏
5. **空间分配**：必须开 `4*n` 大小的数组，否则可能出现空间不足

---

## 七、总结
线段树是解决区间问题的核心数据结构，通过分治思想和懒标记优化，实现了高效的区间操作。掌握基础的构建、更新、查询逻辑，以及进阶的懒标记区间更新，即可应对大部分区间类算法题。

