package BFS;

import java.util.LinkedList;
import java.util.Queue;

/**
 * 一、题目描述
 * 这里有一个非负整数数组 arr，你最开始位于该数组的起始下标 start 处。
 * 当你位于下标 i 处时，你可以跳到 i + arr[i] 或者 i - arr[i]。
 *
 * 请你判断自己是否能够跳到对应元素值为 0 的 任一下标处。
 * 注意：不管是什么情况下，你都无法跳到数组之外。
 *
 * 示例 1：
 * 输入：arr = [4,2,3,0,3,1,2], start = 5
 * 输出：true
 *
 * 解释：
 * 到达值为 0 的下标 3 有以下可能方案：
 * 下标 5 → 下标 4 → 下标 1 → 下标 3
 * 下标 5 → 下标 6 → 下标 4 → 下标 1 → 下标 3
 */
public class bfsDemo {

    // BFS 解法
    public boolean canReach(int[] arr, int start) {
        int n = arr.length;
        boolean[] visited = new boolean[n];
        Queue<Integer> queue = new LinkedList<>();

        queue.offer(start);
        visited[start] = true;

        while (!queue.isEmpty()) {
            int index = queue.poll();

            // 找到值为 0，直接返回
            if (arr[index] == 0) {
                return true;
            }

            // 两个可跳位置
            int next1 = index + arr[index];
            int next2 = index - arr[index];

            // 左边合法
            if (next1 >= 0 && next1 < n && !visited[next1]) {
                visited[next1] = true;
                queue.offer(next1);
            }

            // 右边合法
            if (next2 >= 0 && next2 < n && !visited[next2]) {
                visited[next2] = true;
                queue.offer(next2);
            }
        }

        return false;
    }

    // 测试 main 方法（可选）
    public static void main(String[] args) {
        bfsDemo demo = new bfsDemo();
        int[] arr = {4,2,3,0,3,1,2};
        int start = 5;
        System.out.println(demo.canReach(arr, start)); // 输出 true
    }
}