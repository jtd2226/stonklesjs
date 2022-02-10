import PrefixTrie from './PrefixTrie';

describe('app-root', () => {
  it('do be workin', async () => {
    const bank = ['baggage', 'bag', 'bags', 'bad', 'abaggle'];
    const expected = ['bad', 'bag', 'baggage', 'bags'];
    const trie = PrefixTrie(bank);
    const results = trie.find('b');
    expect(results).toEqual(expected);
  });

  it('do be workin', async () => {
    const bank = ['baggage', 'bag', 'bags', 'bad', 'abaggle'];
    const expected = ['bag', 'baggage', 'bags'];
    const trie = PrefixTrie(bank);
    const results = trie.find('ba');
    expect(results).toEqual(expected);
  });

  it('do be workin', async () => {
    const bank = ['baggage', 'bag', 'bags', 'bad', 'abaggle'];
    const expected = ['bag', 'baggage', 'bags'];
    const trie = PrefixTrie(bank);
    const results = trie.find('bag');
    expect(results).toEqual(expected);
  });

  it('do be workin', async () => {
    const bank = ['baggage', 'bag', 'bags', 'bad', 'abaggle'];
    const expected = ['bags'];
    const trie = PrefixTrie(bank);
    const results = trie.find('bags');
    expect(results).toEqual(expected);
  });

  it('do be workin', async () => {
    const bank = ['baggage', 'bag', 'bags', 'bad', 'abaggle'];
    const expected = ['bad'];
    const trie = PrefixTrie(bank);
    const results = trie.find('baddy');
    expect(results).toEqual(expected);
  });
});
