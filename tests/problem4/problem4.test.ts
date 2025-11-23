import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from '../../src/problem4'


describe('problem4', () => {
    it('sum_to_n_a_with_n_is_odd', () => {
        let sum = sum_to_n_a(5)
        expect(sum).toBe(15)
    })

    it('sum_to_n_a_with_n_is_even', () => {
        let sum = sum_to_n_a(6)
        expect(sum).toBe(21)
    })

    it('sum_to_n_b_with_n_is_odd', () => {
        let sum = sum_to_n_b(5)
        expect(sum).toBe(15)
    })

    it('sum_to_n_b_with_n_is_even', () => {
        let sum = sum_to_n_b(6)
        expect(sum).toBe(21)
    })

    it('sum_to_n_c_with_n_is_odd', () => {
        let sum = sum_to_n_c(5)
        expect(sum).toBe(15)
    })

    it('sum_to_n_c_with_n_is_even', () => {
        let sum = sum_to_n_c(6)
        expect(sum).toBe(21)
    })
})