interface Trie {
  [index: string]: PrefixTrie;
}

type PrefixTrie = {
  value?: string;
  words: Set<string>;
  add: (word: string, index?: number) => void;
  child: (char: string) => PrefixTrie;
  matches: string[];
  find: (input?: string) => string[];
  children: Trie;
};

function node(value?: string): PrefixTrie {
  const children: Trie = {};
  const words = new Set<string>();
  function add(word: string, index: number = 0) {
    const char = word?.[index]?.toLowerCase?.();
    words.add(word);
    if (!char) return;
    const child = (children[char] ??= node(char));
    child.add(word, index + 1);
  }
  function child(char: string) {
    if (!char?.toLowerCase) return null;
    return children[char.toLowerCase()];
  }
  function matches() {
    return Array.from(words).sort((a: string, b: string) => a.localeCompare(b));
  }
  function find(input?: string) {
    return child(input?.[0])?.find(input.slice(1)) ?? matches();
  }
  return {
    value,
    add,
    words,
    child,
    get matches() {
      return matches();
    },
    find,
    children,
  };
}

function PrefixTrie(bank: string[]): PrefixTrie {
  return bank.reduce((trie: PrefixTrie, word: string) => {
    trie.add(word);
    return trie;
  }, node(null));
}

export default PrefixTrie;
