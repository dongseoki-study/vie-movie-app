import { shallowMount } from '@vue/test-utils'
import store from '~/store'
import router from '~/routes'
import Header from '~/components/Header'

describe('components/Header.vue', () => {

    let wrapper;
    beforeEach(async () => {

        window.scrollTo = jest.fn() // Mock

        router.push('/movie/ttttaaa')
        await router.isReady()

        wrapper = shallowMount(Header, {
            global: {
              plugins: [
                store,
                router
              ]
            }
          });
    
    });


    test('경로 정규 표현식이 없는 경우 일치하지 않습니다.', () => {

        // const wrapper = shallowMount(Header, {
        //     global: {
        //       plugins: [
        //         store,
        //         router
        //       ]
        //     }
        //   });
        
        const regExp = undefined;
        expect(wrapper.vm.isMatch(regExp)).toBe(false);
    });


    test('경로 정규 표현식이 있는 경우 일치합니다.', () => {

        const regExp = /^\/movie/;
        expect(wrapper.vm.isMatch(regExp)).toBe(true);

    });


    test('경로 정규표현식과 일치하지 않아야 합니다.', () => {

        const regExp = /^\/hello/;
        expect(wrapper.vm.isMatch(regExp)).toBe(false);

    });


});