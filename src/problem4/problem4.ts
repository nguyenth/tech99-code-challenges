
export function sum_to_n_a(n: number): number {
    // Time Complexity: O(n), Space Complexity O(1). by using aggregation
    let sum = 0
	for (let i = 1; i <= n; i++) {
        sum += i
    }

    return sum
}

export function sum_to_n_b(n: number): number {
	// Time Complexity: O(1), Space Complexity O(1), sum pair of start and end
    if (n < 2) {
        return 1
    }

    let mid = Math.floor(n/2)
	return (n % 2)*(mid + 1) + (1 + n) * mid
}

export function sum_to_n_c(n: number): number {
    // Time Complexity: O(1), Space Complexity O(1) by using math formula
	return n*(n+1)/2
}